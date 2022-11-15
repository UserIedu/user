try{
    var dic = JSON.parse( Response.getURLData() );
    var user = dic["user"];
    var pass = dic["pass"];
    var userFile = File.newFile(File.getWebsitePath()+"/data/users.json");
    if(!userFile.exists())	{
        userFile.createFile( true );
        userFile.write( "{}" );
    }
    var userDic = JSON.parse( userFile.read());
    if(userDic.hasOwnProperty(user))	{
        if(userDic[user]!=pass)		{
            var code = File.newFile(File.getWebsitePath()+"/alert.html").read();
            Response.setHTML( code.replace("$TITLE$","未登录").replace("$MSG$","密码错误。") , "UTF-8" );
        }
        var code = File.newFile(File.getWebsitePath()+"/alert.html").read();
        Response.setHTML( code.replace("$TITLE$","已登录").replace("$MSG$","你好，"+user+"！") , "UTF-8" );
    }
    else	{
        var code = File.newFile(File.getWebsitePath()+"/alert.html").read();
        Response.setHTML( code.replace("$TITLE$","无法登录").replace("$MSG$","服务器中不存在此账户，你可以尝试<a href='reg.html'>注册</a>。") , "UTF-8" );
    }
}
catch(err){
    var code = File.newFile(File.getWebsitePath()+"/alert.html").read();
    Response.setHTML( code.replace("$TITLE$","出错了").replace("$MSG$","错误信息："+err.toString()+"。") , "UTF-8" );
}
