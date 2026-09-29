# Servidor de Desarrollo local para ConectaYungay
# Resuelve bloqueos de CORS cargando archivos locales de texto plano y mapas.

$port = 8000
$localPath = "c:\Users\mtagl\Documents\ConectaYungay"
$url = "http://localhost:$port/"

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add($url)

Write-Output "=================================================="
Write-Output "   Iniciando Servidor Web para ConectaYungay"
Write-Output "   Puerto: $port"
Write-Output "   Ruta local: $localPath"
Write-Output "   URL: $url"
Write-Output "=================================================="

try {
    $listener.Start()
    Write-Output "Servidor ejecutándose con éxito."
    Write-Output "Abriendo tu navegador en $url..."
    
    # Abrir navegador por defecto
    Start-Process $url

    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $rawUrl = $request.RawUrl
        # Eliminar parámetros de consulta (?origin=...) para encontrar el archivo físico
        if ($rawUrl.Contains("?")) {
            $rawUrl = $rawUrl.Split("?")[0]
        }

        # Resolver ruta local
        $relativeFile = $rawUrl.TrimStart('/')
        if ([string]::IsNullOrEmpty($relativeFile)) {
            $filePath = Join-Path $localPath "index.html"
        }
        else {
            $filePath = Join-Path $localPath $relativeFile
        }

        # Si apunta a una carpeta, buscar index.html
        if (Test-Path $filePath -PathType Container) {
            $filePath = Join-Path $filePath "index.html"
        }

        if (Test-Path $filePath -PathType Leaf) {
            $bytes = [System.IO.File]::ReadAllBytes($filePath)
            
            # Content Type
            $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
            $contentType = "text/plain"
            switch ($ext) {
                ".html" { $contentType = "text/html; charset=utf-8" }
                ".css" { $contentType = "text/css; charset=utf-8" }
                ".js" { $contentType = "application/javascript; charset=utf-8" }
                ".png" { $contentType = "image/png" }
                ".jpg" { $contentType = "image/jpeg" }
                ".txt" { $contentType = "text/plain; charset=utf-8" }
                ".ico" { $contentType = "image/x-icon" }
            }

            $response.ContentType = $contentType
            $response.ContentLength64 = $bytes.Length
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        }
        else {
            $response.StatusCode = 404
            $errBytes = [System.Text.Encoding]::UTF8.GetBytes("404 Archivo No Encontrado: $rawUrl")
            $response.ContentType = "text/plain; charset=utf-8"
            $response.OutputStream.Write($errBytes, 0, $errBytes.Length)
        }
        $response.Close()
    }
}
catch {
    Write-Error $_
}
finally {
    if ($null -ne $listener) {
        $listener.Stop()
        $listener.Close()
        Write-Output "Servidor detenido."
    }
}
