$tempDir = Join-Path $env:TEMP 'ranjitha_pack'
if (Test-Path $tempDir) { Remove-Item -Recurse -Force $tempDir }
New-Item -ItemType Directory -Path $tempDir | Out-Null
Copy-Item -Path 'index.html' -Destination $tempDir
Copy-Item -Path 'favicon.ico' -Destination $tempDir
Copy-Item -Path 'assets' -Destination $tempDir -Recurse
$zipDst = 'C:\Users\vishn\OneDrive\Desktop\ranjitha-makeover-ready.zip'
if (Test-Path $zipDst) { Remove-Item -Force $zipDst }
Compress-Archive -Path "$tempDir\*" -DestinationPath $zipDst -Force
Remove-Item -Recurse -Force $tempDir
Write-Output 'Zip created successfully without lock conflict'
