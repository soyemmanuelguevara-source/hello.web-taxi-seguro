#!/usr/bin/env bash
set -euo pipefail

# Redimensiona imágenes locales a tamaños adecuados usando sips (macOS)
# Ejecutar: bash scripts/optimize-images.sh

resize() {
  src="$1"
  width="$2"
  if [ ! -f "$src" ]; then
    echo "Archivo no encontrado: $src"
    return
  fi
  tmp="${src}.tmp.jpg"
  sips --resampleWidth "$width" "$src" --out "$tmp" >/dev/null
  mv "$tmp" "$src"
  echo "Optimizado: $src -> ${width}px"
}

resize images/hero.jpg 1800
resize images/service-bg.jpg 1800
resize images/security-bg.jpg 1800
resize images/contact-bg.jpg 1800

resize images/amb1.jpg 1400
resize images/amb2.jpg 1400
resize images/amb3.jpg 1400
resize images/panel.jpg 1400

resize images/gallery1.jpg 1200
resize images/gallery2.jpg 1200
resize images/gallery3.jpg 1200

echo "Optimización completada."
