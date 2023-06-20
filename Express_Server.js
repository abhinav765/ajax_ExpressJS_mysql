var exp = require('express');
var app = exp();
var mysql = require('mysql2');

app.listen(9000,function(){
    console.log("server started at 9000");
})

var con = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"new"
})

con.connect(function(err){
    if(!err)
    {
        console.log("database connected")
    }
    else
    {
        console.log("database not connected")
    }
})

app.get('/login',function(req,res){
    res.sendFile(__dirname+"/Empform.html");
})

app.get('/getinfo',function(req,res){
    var nm = req.query.ename;
    console.log(nm);
    con.query("select * from emp where ename="+"'"+nm+"'",function(err,result){
        
        if(!err)
        {
            
            str="";
            str+="<table border='1' style='border-collapse : collapse;'>"
            if(result.length==1)
            {
                
                result.forEach(function(v) {
                    
                   str+="<tr>";
                    str+="<td>"+v.EMPNO+"</td>";
                    str+="<td>"+v.ENAME+"</td>";
                    str+="<td>"+v.JOB+"</td>";
                    str+="<td>"+v.MGR+"</td>";
                    str+="<td>"+v.HIREDATE+"</td>";
                    str+="<td>"+v.SAL+"</td>";
                    str+="<td>"+v.COMM+"</td>";
                    str+="<td>"+v.DEPTNO+"</td>";
                    str+="</tr>"
                })
                
                str+="</table>"
                console.log(str);
                res.send(str);
            }
            else
            {
                res.send("user name is wrong")
            }
        }
        else
        {
            res.send("wrong name");
        }
    })
})

