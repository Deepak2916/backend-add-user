const http=require('http')
const fs=require('fs')
let message;
const server=http.createServer((req,res)=>{
  
     const text=fs.readFileSync("message.text","utf8")
     message=text
     const url=req.url
     const method=req.method
     if(url=='/'){
     res.write("<html>")
     res.write("<head><title>read data</title></head>")
     res.write(`<body>
     <h3>${message}</h3>
     <form action="/message" method="POST">
     <input type="text" name="message"/>
     <button type="submit">send</button>
     </body>`)
     res.write("</html>")
     return res.end
     }
     if(url=="/message" && method=="POST"){
          const body=[];
          function request(){
             req.on("data",(chunk)=>{
                    body.push(chunk)
               })
            req.on('end',()=>{
               const parsedBody=Buffer.concat(body).toString()
               const mes=parsedBody.split('=')[1]
               fs.writeFileSync("message.text",mes)
          res.statusCode=302
           res.setHeader('location','/')
           return res.end()

           })
     }
     request()
     }
     
})
server.listen(3000)