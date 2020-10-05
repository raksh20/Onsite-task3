const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.use(express.json());
var count=0;
var request = require('request'); 
var num=1;
app.get('/', (req, res) => {
  res.render('search.ejs')
})
app.get('/result', (req, res) => {
  res.render('result.ejs')
})
var match=false;
var related2=false;
app.post('/search', async (req,res)=>{
	artist1=req.body.artist1;
	artist2=req.body.artist2;
	request.post(authOptions, function(error, response, body) {
		if (!error && response.statusCode === 200){
			var token = body.access_token;
			var art1 = {
				     	 url: 'https://api.spotify.com/v1/search?q='+artist1+'&type=artist',
				     	 headers: {
				     	 	'Accept': 'application/json',
				      		'Content-Type': 'application/json',
				       		 'Authorization': 'Bearer ' + token
				     			 },
				      		json: true
				   		 };
			request.get(art1, function(error, response, body) {
				      //console.log(body.artists.items[0].id);
				artist1_id=body.artists.items[0].id;
				      //console.log(artist1_id);

				var art2 = {
				      url: 'https://api.spotify.com/v1/search?q='+artist2+'&type=artist',
				      headers: {
				      	'Accept': 'application/json',
				      	'Content-Type': 'application/json',
				        'Authorization': 'Bearer ' + token
				      },
				      json: true
				    };
				request.get(art2, async function(error, response, body) {
				      //console.log(body.artists.items[0].id);
				      artist2_id= body.artists.items[0].id;
				      //var arr=getRelatedArtists(artist1_id);
				      //console.log(arr);
				      var relatedArr1=[];
				      var related1 = {
				      url: 'https://api.spotify.com/v1/artists/'+artist1_id+'/related-artists',
				      headers: {
				      	'Accept': 'application/json',
				      	'Content-Type': 'application/json',
				        'Authorization': 'Bearer ' + token
				      },
				      json: true
				    };
				    request.get(related1, function(error, response, body) {
				    	for(var i=0;i<20;i++){
				    		if(body.artists[i].id==artist2_id){
				    			//console.log('matched');
				    			match=true;
				    			count++;
				    			console.log('shortest path is '+count);
				    			//res.render('result', {Data: count});
				    			//console.log(body.artists[i].id);
				    		}else{
				    			//console.log('not match')
				    		}

				    		relatedArr1.push(body.artists[i].id);

				    		//console.log(body.artists[i].id);
				    	}
				    	//console.log(relatedArr1);
				    	//console.log('relatedArr'+num);
				    	//var Arr='relatedArr'+num;
				    	//console.log(Arr);
				    	
				    	if(match==false){
				    		

					    		count++;
								    		console.log('false');
								for(var j=0;j<20;j++){
										    			 var related2 = {
										      		url: 'https://api.spotify.com/v1/artists/'+body.artists[j].id+'/related-artists',
										      		headers: {
										      		'Accept': 'application/json',
										      		'Content-Type': 'application/json',
										        	'Authorization': 'Bearer ' + token
										      		},
										      		json: true
										    		};
								    request.get(related2, function(error, response, body) {
								    	for(var i=0;i<20;i++){
								    		if(body.artists[i].id==artist2_id){
								    				console.log('matched');
								    				match=true;
								    				related2=true;
								    				count++;
								    				console.log('shortest path is '+count);
								    		}else{
								    			//console.log('not match')
								    		}

								    		
								    		//console.log(body.artists[i].id);
								    	}
								    	if(related2==false){
				    		

					    		count++;
								    		console.log('false');
								for(var j=0;j<20;j++){
										    			 var related3 = {
										      		url: 'https://api.spotify.com/v1/artists/'+body.artists[j].id+'/related-artists',
										      		headers: {
										      		'Accept': 'application/json',
										      		'Content-Type': 'application/json',
										        	'Authorization': 'Bearer ' + token
										      		},
										      		json: true
										    		};
								    request.get(related3, function(error, response, body) {
								    	for(var i=0;i<20;i++){
								    		if(body.artists[i].id==artist2_id){
								    				console.log('matched');
								    				match=true;
								    				count++;
								    				console.log('shortest path is '+count);
								    		}else{
								    			//console.log('not match')
								    		}

								    		
								    		//console.log(body.artists[i].id);
								    	}
								    	

								    })

					    		}
					    	}


								    })

					    		}
				    		
				    	}
					});
				      //console.log(body);
				      //artist1_id=body.artists.items[0].id;
				      //console.log(artist2_id);
				  });
	
				});
		}
	});
					 res.redirect('/');  
	
});

if(count==0){
		console.log('connection');

	}else{
		console.log("shortest path is"+count);
	}


  var clientId = '37ba2f5653304b8696e3ddcbbee2c2ff'
  var clientSecret = '09aed7abcbcc44af9e413bfea581b499';

var client_id = '37ba2f5653304b8696e3ddcbbee2c2ff'; 
var client_secret = '09aed7abcbcc44af9e413bfea581b499';
var encodedData = Buffer.from(client_id + ':' + client_secret).toString('base64');

var authOptions = {


  url: 'https://accounts.spotify.com/api/token',

  headers: {
  	'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': 'Basic ' + encodedData
    
  },
  form: {
  	
    grant_type: 'client_credentials'
  },
  json: true
};
var artist1;
var artist2;
var artist1_id;
var artist2_id;
//console.log(artist1,artist2);
var artistsArr=[];

app.listen(3000, ()=>console.log("Listening on port 3000"));