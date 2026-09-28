$tmp = "C:\Users\vishn\OneDrive\Desktop\ranjitha_deploy"
if (Test-Path $tmp) { Remove-Item -Recurse -Force $tmp }
New-Item -ItemType Directory -Path $tmp | Out-Null
Copy-Item "index.html" -Destination $tmp
Copy-Item "favicon.ico" -Destination $tmp
Copy-Item -Recurse "assets" -Destination $tmp
$zipPath = "C:\Users\vishn\OneDrive\Desktop\ranjitha-makeover-ready.zip"
if (Test-Path $zipPath) { Remove-Item -Force $zipPath }
Compress-Archive -Path "$tmp\*" -DestinationPath $zipPath -Force
Remove-Item -Recurse -Force $tmp
Write-Host "Deployable zip created successfully: $zipPath"
