const express=require("express")
const { kanbanRouter }=require("./routes/kanbanRoute")
const app=express()
const {connection}=require("./config/db")
app.get("/",(req,res)=>{
res.send("welcom to Kanban App")
})
app.use(express.json())
app.use("/",kanbanRouter)
app.listen(8080,async()=>{
try{
await connection
console.log("connected with Mongo Db")
}catch(err){
console.log(err)
}
})