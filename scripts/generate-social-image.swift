// Run from the repository root:
// swift -module-cache-path /tmp/portfolio-swift-cache scripts/generate-social-image.swift
import AppKit
import CoreText
import ImageIO
import UniformTypeIdentifiers

let width = 1200, height = 630
let context = CGContext(data: nil, width: width, height: height, bitsPerComponent: 8,
    bytesPerRow: 0, space: CGColorSpace(name: CGColorSpace.sRGB)!,
    bitmapInfo: CGImageAlphaInfo.noneSkipLast.rawValue)!
NSGraphicsContext.saveGraphicsState()
let graphics = NSGraphicsContext(cgContext: context, flipped: false)
NSGraphicsContext.current = graphics
context.interpolationQuality = .high
func color(_ r: CGFloat, _ g: CGFloat, _ b: CGFloat) -> NSColor {
    NSColor(srgbRed: r / 255, green: g / 255, blue: b / 255, alpha: 1)
}
let cream = color(225, 224, 204)
color(8, 8, 8).setFill()
NSRect(x: 0, y: 0, width: width, height: height).fill()
color(27, 27, 27).setStroke()
let grid = NSBezierPath()
for x in stride(from: 0, through: width, by: 24) {
    grid.move(to: NSPoint(x: x, y: 0)); grid.line(to: NSPoint(x: x, y: height))
}
for y in stride(from: 0, through: height, by: 24) {
    grid.move(to: NSPoint(x: 0, y: y)); grid.line(to: NSPoint(x: width, y: y))
}
grid.lineWidth = 0.5; grid.stroke()
func text(_ value: String, _ x: CGFloat, _ y: CGFloat, _ size: CGFloat, mono: Bool = false) {
    let font = CTFontCreateWithName((mono ? "Menlo" : "ArialMT") as CFString, size, nil)
    let attrs: [NSAttributedString.Key: Any] = [
        NSAttributedString.Key(kCTFontAttributeName as String): font,
        NSAttributedString.Key(kCTForegroundColorAttributeName as String): cream.cgColor,
        NSAttributedString.Key(kCTKernAttributeName as String): mono ? 1 : -size * 0.045]
    let line = CTLineCreateWithAttributedString(NSAttributedString(string: value, attributes: attrs))
    context.textPosition = CGPoint(x: x, y: y + size * 0.22)
    CTLineDraw(line, context)
}
text("flor125.dev", 64, 550, 18, mono: true)
text("Portfolio*", 58, 388, 116)
text("Florencia", 60, 280, 76)
text("Sombra.", 60, 205, 76)
text("Programadora Universitaria de Sistemas", 64, 140, 23)
text("Desarrollo web · Backend · Aplicaciones", 64, 72, 18, mono: true)
let portraitRect = NSRect(x: 810, y: 64, width: 326, height: 450)
guard let source = CGImageSourceCreateWithURL(URL(fileURLWithPath: "assets/images/profile-pic.jpg") as CFURL, nil),
      let portrait = CGImageSourceCreateImageAtIndex(source, 0, nil) else { fatalError("Missing portrait") }
context.saveGState()
context.addPath(CGPath(roundedRect: portraitRect, cornerWidth: 24, cornerHeight: 24, transform: nil))
context.clip()
let scale = max(portraitRect.width / CGFloat(portrait.width), portraitRect.height / CGFloat(portrait.height))
let scaled = CGSize(width: CGFloat(portrait.width) * scale, height: CGFloat(portrait.height) * scale)
context.draw(portrait, in: CGRect(x: portraitRect.midX - scaled.width / 2, y: portraitRect.midY - scaled.height / 2,
    width: scaled.width, height: scaled.height))
context.restoreGState()
NSGraphicsContext.restoreGraphicsState()
let output = URL(fileURLWithPath: "assets/images/portfolio-social.jpg")
let destination = CGImageDestinationCreateWithURL(output as CFURL, UTType.jpeg.identifier as CFString, 1, nil)!
CGImageDestinationAddImage(destination, context.makeImage()!, [kCGImageDestinationLossyCompressionQuality: 0.88] as CFDictionary)
precondition(CGImageDestinationFinalize(destination))
print("Created assets/images/portfolio-social.jpg (1200 × 630)")
