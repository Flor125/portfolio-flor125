// Run from repository root on macOS:
// swift -module-cache-path /tmp/portfolio-swift-cache scripts/generate-social-preview.swift
// Rebuilds from vector drawing and native fonts; never reads the old raster preview.
import AppKit
import CoreText
import ImageIO
import UniformTypeIdentifiers
let width = 1200, height = 630, scale = 2
let space = CGColorSpace(name: CGColorSpace.sRGB)!
func canvas(_ w: Int, _ h: Int) -> CGContext {
    CGContext(data: nil, width: w, height: h, bitsPerComponent: 8, bytesPerRow: 0,
              space: space, bitmapInfo: CGImageAlphaInfo.noneSkipLast.rawValue)!
}
let ctx = canvas(width * scale, height * scale)
ctx.scaleBy(x: CGFloat(scale), y: CGFloat(scale))
ctx.setAllowsAntialiasing(true)
func rgb(_ r: CGFloat, _ g: CGFloat, _ b: CGFloat, _ a: CGFloat = 1) -> CGColor {
    CGColor(colorSpace: space, components: [r/255, g/255, b/255, a])!
}
// Light hero background, Arial/Menlo, and grid from assets/css/styles.css.
ctx.setFillColor(rgb(245,245,239)); ctx.fill(CGRect(x:0,y:0,width:width,height:height))
ctx.setStrokeColor(rgb(32,46,68,0.07)); ctx.setLineWidth(0.5)
for x in stride(from: 0, through: width, by: 16) {
    ctx.move(to: CGPoint(x: x,y:0)); ctx.addLine(to: CGPoint(x:x,y:height))
}
for y in stride(from: 0, through: height, by: 16) {
    ctx.move(to: CGPoint(x:0,y:y)); ctx.addLine(to: CGPoint(x:width,y:y))
}
ctx.strokePath()
// A fixed, reproducible frame of the site's Grid Pulse visual vocabulary.
// Hard square edges are intentional; type is drawn separately at native resolution.
var seed: UInt64 = 125
func random() -> Double {
    seed = seed &* 6364136223846793005 &+ 1442695040888963407
    return Double(seed >> 11) / Double(UInt64.max >> 11)
}
for row in 0..<22 {
    for col in 0..<50 {
        let x = Double(col * 16 + 320), y = Double(row * 16 + 32)
        let distance = abs(pow((x-720)/370,2) + pow((y-195)/158,2) - 1)
        if distance < 0.23 && random() > 0.26 {
            // Same magenta -> violet -> cyan progression as the supplied reference.
            let hue = 0.53 + y / 370 * 0.37
            ctx.setFillColor(NSColor(calibratedHue: hue, saturation: 0.78,
                                      brightness: 0.96, alpha: 0.15 + random()*0.8).cgColor)
            ctx.fill(CGRect(x:x,y:y,width:15,height:15))
        }
    }
}
func text(_ value: String, x: CGFloat, baseline: CGFloat, size: CGFloat, mono: Bool = false, kern: CGFloat = 0) -> CGFloat {
    let font = CTFontCreateWithName((mono ? "Menlo-Regular" : "ArialMT") as CFString,size,nil)
    let attributes: [NSAttributedString.Key: Any] = [
        NSAttributedString.Key(kCTFontAttributeName as String):font,
        NSAttributedString.Key(kCTForegroundColorAttributeName as String):rgb(0,0,0),
        NSAttributedString.Key(kCTKernAttributeName as String):kern]
    let line = CTLineCreateWithAttributedString(NSAttributedString(string:value,attributes:attributes))
    ctx.textPosition = CGPoint(x:x,y:baseline); CTLineDraw(line,ctx)
    return CGFloat(CTLineGetTypographicBounds(line,nil,nil,nil))
}
_ = text("Florencia Sombra",x:40,baseline:473,size:72,kern:-2.5)
_ = text("web development · backend",x:42,baseline:425,size:32,kern:-0.5)
_ = text("flor125.dev",x:994,baseline:500,size:22,mono:true)
let titleWidth = text("Portfolio",x:32,baseline:40,size:216,kern:-15)
_ = text("*",x:32+titleWidth+9,baseline:179,size:58)
// Render vectors at 2400 × 1260, then reduce once for smooth type at 1200 × 630.
let final = canvas(width,height)
final.interpolationQuality = .high
final.draw(ctx.makeImage()!, in:CGRect(x:0,y:0,width:width,height:height))
let path = "assets/images/portfolio-preview-v2.png"
let dest = CGImageDestinationCreateWithURL(URL(fileURLWithPath:path) as CFURL,UTType.png.identifier as CFString,1,nil)!
CGImageDestinationAddImage(dest,final.makeImage()!,nil)
precondition(CGImageDestinationFinalize(dest))
print("Created \(path): 1200 × 630, sRGB PNG")
