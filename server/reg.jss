try{
    var dic = JSON.parse( Response.getURLDatas() );
    var user = dic["user"];
    var pass = dic["pass"];
    var passed = dic["passed"];
    if(pass!=passed)	{
        var code = File.newFile(File.getWebsitePath()+"/alert.html").read();
        Response.setHTML( code.replace("$TITLE$","注册失败").replace("$MSG$","两次输入的密码不同，请重试。") , "UTF-8" );
        throw "";
    }
    var userFile = File.newFile(File.getWebsitePath()+"/data/users.json");
    if(!userFile.exists())	{
        userFile.createFile( true );
        userFile.write( "{}" );
    }
    var userDic = JSON.parse( userFile.read());
    if(userDic.hasOwnProperty(user))	{
        var code = File.newFile(File.getWebsitePath()+"/alert.html").read();
        Response.setHTML( code.replace("$TITLE$","无法注册").replace("$MSG$","服务器中已存在此账户，你可以尝试<a href='index.html'>登录</a>。") , "UTF-8" );
    }
    else	{
        userDic[user] = pass;
        userFile.write( JSON.stringify(userDic) );
        var code = File.newFile(File.getWebsitePath()+"/alert.html").read();
        Response.setHTML( code.replace("$TITLE$","注册成功").replace("$MSG$","现在可以尝试<a href='index.html'>登录</a>。") , "UTF-8" );
    }
}
catch(err){
    var code = File.newFile(File.getWebsitePath()+"/alert.html").read();
    Response.setHTML( code.replace("$TITLE$","出错了").replace("$MSG$","错误信息："+err.toString()+"。") , "UTF-8" );
}
