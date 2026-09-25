param(
    [string]$Model = "gemini-3.6-flash"
)

$ErrorActionPreference = "Stop"
$ProgressPreference = "SilentlyContinue"

[Console]::InputEncoding  = [System.Text.UTF8Encoding]::new($false)
[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new($false)

Set-Location $PSScriptRoot

$Author  = "khadeja-qureshi"
$Project = "fathom-clone"
$Tool    = "jules"

$apiKey = [Environment]::GetEnvironmentVariable("JULES_API_KEY","User")
if (-not $apiKey) {
    throw "JULES_API_KEY is not set."
}

$headers = @{
    "x-goog-api-key" = $apiKey
}

$headersJson = @{
    "x-goog-api-key" = $apiKey
    "Content-Type"   = "application/json"
}

$logDir = Join-Path $PSScriptRoot ".agent-logs"
New-Item -ItemType Directory -Force -Path $logDir | Out-Null

# Find the connected fathom-clone repo automatically.
$sources = Invoke-RestMethod `
    -Uri "https://jules.googleapis.com/v1alpha/sources?pageSize=100" `
    -Headers $headers

$source = $sources.sources | Where-Object {
    $_.githubRepo.owner -eq "khadeja-qureshi" -and
    $_.githubRepo.repo -eq "fathom-clone"
} | Select-Object -First 1

if (-not $source) {
    throw "Jules cannot see khadeja-qureshi/fathom-clone."
}

Write-Host ""
Write-Host "Jules 8x capture ready" -ForegroundColor Green
Write-Host "Repo:  khadeja-qureshi/fathom-clone"
Write-Host "Model: $Model"
Write-Host ""
Write-Host "Type/paste your prompt."
Write-Host "Finish it with a line containing only: .send"
Write-Host ""

$lines = New-Object System.Collections.Generic.List[string]

while ($true) {
    $line = Read-Host
    if ($line -eq ".send") { break }
    $lines.Add($line)
}

$prompt = [string]::Join([Environment]::NewLine, $lines)

if ([string]::IsNullOrWhiteSpace($prompt)) {
    throw "Prompt was empty."
}

$promptTime = [DateTime]::UtcNow

$body = @{
    prompt = $prompt
    title  = "8x captured Jules task"
    sourceContext = @{
        source = $source.name
        githubRepoContext = @{
            startingBranch = "main"
        }
    }
    requirePlanApproval = $false
    automationMode = "AUTO_CREATE_PR"
} | ConvertTo-Json -Depth 10

$session = Invoke-RestMethod `
    -Uri "https://jules.googleapis.com/v1alpha/sessions" `
    -Method Post `
    -Headers $headersJson `
    -Body $body

$sessionId = $session.id

Write-Host ""
Write-Host "Jules session created: $sessionId" -ForegroundColor Cyan
Write-Host $session.url
Write-Host ""
Write-Host "Waiting for Jules..."

$terminalStates = @(
    "COMPLETED",
    "FAILED",
    "AWAITING_USER_FEEDBACK",
    "PAUSED"
)

do {
    Start-Sleep -Seconds 10

    $current = Invoke-RestMethod `
        -Uri "https://jules.googleapis.com/v1alpha/sessions/$sessionId" `
        -Headers $headers

    Write-Host "State: $($current.state)"

} while ($terminalStates -notcontains $current.state)

$activities = Invoke-RestMethod `
    -Uri "https://jules.googleapis.com/v1alpha/sessions/$sessionId/activities?pageSize=100" `
    -Headers $headers

$agentMessages = @(
    $activities.activities |
    Where-Object { $_.agentMessaged -and $_.agentMessaged.agentMessage }
)

if ($agentMessages.Count -gt 0) {
    $finalActivity = $agentMessages[-1]
    $response = $finalActivity.agentMessaged.agentMessage
    $responseTime = [DateTime]::Parse($finalActivity.createTime).ToUniversalTime()
}
elseif ($current.state -eq "FAILED") {
    $failed = $activities.activities |
        Where-Object { $_.sessionFailed } |
        Select-Object -Last 1

    $response = "Session failed: $($failed.sessionFailed.reason)"
    $responseTime = [DateTime]::UtcNow
}
else {
    $response = "Jules session ended with state $($current.state), but no final agent message was returned."
    $responseTime = [DateTime]::UtcNow
}

function IsoUtc([DateTime]$dt) {
    $dt.ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ss.fffZ")
}

$fileName = (
    $promptTime.ToString("yyyy-MM-dd_HH-mm-ss") +
    "_" +
    $sessionId +
    ".md"
)

$logPath = Join-Path $logDir $fileName

$log = @"
---
session_id: $sessionId
date: $($promptTime.ToString("yyyy-MM-dd"))
author: $Author
model: $Model
tool: $Tool
project: $Project
total_exchanges: 1
first_prompt_time: $(IsoUtc $promptTime)
last_prompt_time: $(IsoUtc $promptTime)
---

# Session Log - $($promptTime.ToString("yyyy-MM-dd"))

Session: ``$($sessionId.Substring(0,[Math]::Min(8,$sessionId.Length)))`` | Project: ``$Project`` | Author: ``$Author``

---

[LOG_ENTRY type=PROMPT num=1 session=$($sessionId.Substring(0,[Math]::Min(8,$sessionId.Length)))]
timestamp: $(IsoUtc $promptTime)
model: $Model

$prompt


[LOG_ENTRY type=RESPONSE num=1 session=$($sessionId.Substring(0,[Math]::Min(8,$sessionId.Length)))]
timestamp: $(IsoUtc $responseTime)
model: $Model

$response
"@

[System.IO.File]::WriteAllText(
    $logPath,
    $log,
    [System.Text.UTF8Encoding]::new($false)
)

Write-Host ""
Write-Host "====================================" -ForegroundColor Green
Write-Host "Jules finished: $($current.state)" -ForegroundColor Green
Write-Host "Captured log:"
Write-Host $logPath
Write-Host "====================================" -ForegroundColor Green
Write-Host ""
Write-Host "Final Jules response:"
Write-Host $response
