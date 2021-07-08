import PdfPrinter from "pdfmake"

export const generatePDFReadableStream = (obj,img) => {
    
    const fonts = {
        Roboto:{
            normal: "Helvetica",
            bold:"Helvetica-bold",
            italics: "Helvetica-Oblique",
            bolditalics: "Helvetica-Oblique"
        },
        hello:{
            normal:"src/lib/fonts/hello.ttf"
        },
        MidnightInOctober:{
            normal:"src/lib/fonts/Midnight in October - TTF.ttf"
        }
    }

    const printer = new PdfPrinter(fonts)

    const docDefinition = {
        content:[        
             
                {
                    text:obj.title,
                    fontSize: 24,
                    font:"MidnightInOctober",
                    margin:[0,10,0,10]
                },
                
                {
                    text:`${obj.readTime.value} ${obj.readTime.unit}`,
                    fontSize: 24,
                    font:"hello",
                    alignment:"right",
                    absolutePosition: {x: 0, y:55}
                },

                {
                    image:img,
                    width:500,
                    height:250,
                    margin:[0,10,0,10]
                },
            
                 {
                   text:obj.content,
                   alignment:'center',
                   fontSize: 20,
                   font:"hello", 
                 }            
        ]
    }

    const pdfReadableStream = printer.createPdfKitDocument(docDefinition)
    pdfReadableStream.end()
    return pdfReadableStream
}

export const stream2Buffer = (stream) => {
    return new Promise((resolve, reject) => {
      const _buf = []
      stream.on("data", (chunk) => _buf.push(chunk))
      stream.on("end", () => resolve(Buffer.concat(_buf)))
      stream.on("error", (err) => reject(err))
    })

  }