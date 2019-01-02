const Discord = require('discord.js');
 const client = new Discord.Client();


client.on('ready', () => {
 console.log(`Logged in as ${client.user.tag}!`);
 });

client.on('message', async message => {
	if (message.content === '!ZBot ping') {
		message.reply('pong');
	}
});



client.on('voiceStateUpdate', (oldMember, newMember) => {
	//setting key variables
  	var server = client.guilds.get('529344863196413953');//server id here
  	//getting information on the channels
	let newUserChannel = newMember.voiceChannel
  	let oldUserChannel = oldMember.voiceChannel


//Seeing what caused the code to be called

  if(newUserChannel === undefined){

  		//stuff that gets done if a user leaves a voice channel////////////////////////////////////////////
  		deleteEmptyClones(server);



  } else if(oldUserChannel !== newUserChannel){

  	//stuff that gets done if a user joins or switches voice channels//////////////////////////////////////////////
  	deleteEmptyClones(server);
   	switch(newUserChannel.id) { //checking if the user entered a 'Create a voice channel' channel
  			case '529635894152527884' :
  			CloneChannelAndTransfer(server,newUserChannel,'Sub-General',-1,newMember);
  			break;
  			case '529587477598699524' :
		  	CloneChannelAndTransfer(server,newUserChannel,'0',4,newMember);
		  	break;
  		}
  	}

})








//Make and transfers a user inside a clone voice channel
function CloneChannelAndTransfer(server, channelToClone, nameScheme, vUserLimit, UserA) {
/*
	server : client.guilds.get('Server ID HERE'); 			 					channeltoClone : the channel to clone
	nameScheme : 0 for 'parent name - j', else 'namescheme - j '				 vUserLimit : 1-100 or -1 for the same as the parent channel
	UserA : the User who has changed channels
*/

	//Counting how many clones already exist
	var j = 1;
  	for (var i = 0; i < server.channels.array().length; i++) {
  			if (((server.channels.array()[i].name === `${channelToClone.name} #${j}`) || (server.channels.array()[i].name === `${nameScheme} #${j}`))&& (server.channels.array()[i].parent === channelToClone.parent)) {
  				j++;
  			}
  	}
  	//setting the clone's name
	if (nameScheme ==='0' )
		var name  = `${channelToClone.name} #${j}`;
	else
  		var name  = `${nameScheme} #${j}`;

	channelToClone.clone(name, true, false).then(CloneChannel =>{//making a clone channel that inherits the parent's permissions 
				
	  				CloneChannel.setParent(`${channelToClone.parentID}`)//setting the channel's category 
	  				if (vUserLimit  === -1) {
  					CloneChannel.edit({ userLimit : channelToClone.userLimit});//and transfering userLimit
  					} else {
  						CloneChannel.edit({ userLimit : vUserLimit});//and transfering userLimit
  					}
  					UserA.setVoiceChannel(CloneChannel);//moving the user into the clone channel
  	})

}

function deleteEmptyClones(server) {
  	//testing if there are any Temporary channels with no-one inside
  	for (var i = 0; i < server.channels.array().length; i++) {//for every channel there is on the server
  		var channelName =server.channels.array()[i].name
  		if (channelName.includes(' #'))//testing whether the channel's name includes 'Copy'
  		{
  			var IsTherePeopleInTheChannel = false; //variable used to check whether the search for active users has been inconclusive
  			var mems = server.channels.array()[i].members; //an array of members inside
			for (let [snowflake, guildMember] of mems) {
  				IsTherePeopleInTheChannel = true;
			}

			if (!IsTherePeopleInTheChannel){//If the channel is empty
				server.channels.array()[i].delete();//deletes the channel
			}
  			
  		}
  	}
}

client.login('NTI5MzQzMDUzMzQxNzg2MTIz.DwveLg.IihGo0BjUdBp9BIcEyNklB7GUS8');