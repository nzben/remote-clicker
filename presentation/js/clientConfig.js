var config = {};
try{
	config.port = process.env.PORT;
} catch(e)
{
	config.port = 1337;
}