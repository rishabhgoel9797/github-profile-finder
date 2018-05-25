$(document).ready(function(){
$('#search').on('keyup',function(e){
	let user=e.target.value;

	//Make request to github
	$.ajax({
		url:'https://api.github.com/users/'+user,
		data:{
			client_id:'5bdb6beac3266cc04c08',
			client_secret:'3de8469359dc1c69c9706703d9fc9358f752a9c6'
		}
	}).done(function(user){
		//console.log(user);

		$.ajax({
			url:'https://api.github.com/users/'+user+'/repos',
			data:{
			client_id:'5bdb6beac3266cc04c08',
			client_secret:'3de8469359dc1c69c9706703d9fc9358f752a9c6'
		}
		}).done(function(repos){
			$.each(repos,function(index,repo){
				$('#repos').append(`
					<div class="well">
						<div class="row">
							<div class="col-md-7">
								<strong>${repo.name}</strong>
							</div>
							<div class="col-md-3">

							</div>
							<div class="col-md-2">

							</div>
						</div>
					</div>
					`);
			});
		});

		$('#profile').html(`
			<div class="panel panel-default" style="margin-top:20px">
				  <div class="panel-heading">
				    <h3 class="panel-title">${user.name}</h3>
				  </div>
				  <div class="panel-body">
				    <div class="row">
				    	<div class="col-md-3">
				    	<img src="${user.avatar_url}" class="thumbnail avatar">
				    	<a href="${user.html_url}" class="btn btn-primary btn-block" target="_blank">View Profile</a>
				    	</div>
				    	<div class="col-md-9">
				    		<span class="label label-default">Public Repositories: ${user.public_repos}</span>
							<span class="label label-primary">Public Gists: ${user.public_gists}</span>
							<span class="label label-success">Followers: ${user.followers}</span>
							<span class="label label-info">Following: ${user.following}</span>
							<br><br>
							<ul class="list-group">
								<li class="list-group-item">Company: ${user.company}</li>
								<li class="list-group-item">Website/Blog: ${user.blog}</li>
								<li class="list-group-item">Location: ${user.location}</li>
								<li class="list-group-item">Member since: ${user.created_at}</li>
							</ul>
				    	</div>
				    </div>
				  </div>
			</div>

			<h3 class="page-header">Latest Repositories</h3>
			<div id="repos"></div>
			`);
	});
});
});