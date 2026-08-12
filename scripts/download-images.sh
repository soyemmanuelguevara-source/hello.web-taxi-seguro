#!/usr/bin/env bash
set -euo pipefail

# Descarga fotografías de taxis amarillos para la landing.
# Ejecuta: bash scripts/download-images.sh

mkdir -p images

# Use a browser-like user agent to avoid Unsplash returning HTML redirects
UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"

download() {
	out="$1"
	url="$2"
	echo "Descargando $url -> $out"
	curl -L -sS -H "User-Agent: $UA" -o "$out" "$url"
	file "$out" || true
}
download images/hero.jpg "https://images.unsplash.com/photo-1553689895-e8f673d3c052?auto=format&fit=crop&w=1800&q=82"
download images/service-bg.jpg "https://images.unsplash.com/photo-1533945731234-1d47cc3a906b?auto=format&fit=crop&w=1800&q=82"
download images/security-bg.jpg "https://images.unsplash.com/photo-1630717285906-29364ffacea0?auto=format&fit=crop&w=1800&q=82"
download images/contact-bg.jpg "https://images.unsplash.com/photo-1649706063159-4d7a42ac9ccc?auto=format&fit=crop&w=1800&q=82"

download images/amb1.jpg "https://images.unsplash.com/photo-1533945731234-1d47cc3a906b?auto=format&fit=crop&w=1400&q=82"
download images/amb2.jpg "https://images.unsplash.com/photo-1553689895-e8f673d3c052?auto=format&fit=crop&w=1400&q=82"
download images/amb3.jpg "https://images.unsplash.com/photo-1649706063159-4d7a42ac9ccc?auto=format&fit=crop&w=1400&q=82"

download images/panel.jpg "https://images.unsplash.com/photo-1630717285906-29364ffacea0?auto=format&fit=crop&w=1400&q=82"

download images/gallery1.jpg "https://images.unsplash.com/photo-1533945731234-1d47cc3a906b?auto=format&fit=crop&w=1200&q=82"
download images/gallery2.jpg "https://images.unsplash.com/photo-1553689895-e8f673d3c052?auto=format&fit=crop&w=1200&q=82"
download images/gallery3.jpg "https://images.unsplash.com/photo-1649706063159-4d7a42ac9ccc?auto=format&fit=crop&w=1200&q=82"

echo "Descarga completa. Revisa images/ para verificar las fotos."
