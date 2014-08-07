var Github=function(a,b){this.owner=a,this.repo=b,this.milestone="",this.REPO_BASE="https://api.github.com/",this.access_token=localStorage.getItem("access_token")};Github.prototype={getAccessToken:function(){var a=/\?code=([^\/]+)\/?/;if(window.location.search&&a.test(window.location.search)){var b=a.exec(location.search);return Q($.ajax({url:"http://query.yahooapis.com/v1/public/yql?q=env%20%22store%3A%2F%2F0zaLUaPXLo4GWBb1koVqO6%22%3Bselect%20OAuth%20from%20github%20where%20CODE%3D%22"+b.pop()+"%22&format=json&diagnostics=true&callback=?",type:"GET",dataType:"json"})).then(function(a){localStorage.setItem("access_token",a.query.results.token.OAuth.access_token),location.search=""},function(a){console.log("invalid code",a)})}return Q(this.access_token)},getComments:function(a){return Q($.ajax({url:this.getReposUrl()+"/issues/"+a+"/comments"+this.concatToken(),type:"GET",dataType:"json"}))},getUser:function(){return Q($.ajax({url:this.REPO_BASE+"user"+this.concatToken(),type:"GET",dataType:"json"}))},getReposUrl:function(){return this.REPO_BASE+"repos/"+this.owner+"/"+this.repo},concatToken:function(){return this.access_token?"?access_token="+this.access_token:""},checkLogin:function(){return localStorage.getItem("access_token")?(this.access_token=localStorage.getItem("access_token"),!0):!1},logout:function(){localStorage.remove("access_token"),window.location.reload()},getLabels:function(){return Q($.ajax({url:this.getReposUrl()+"/labels"+this.concatToken(),type:"GET",dataType:"json"}))},getMilestones:function(){return Q($.ajax({url:this.getReposUrl()+"/milestones"+this.concatToken(),type:"GET",dataType:"json"}))},getIssues:function(a){return a="undefined"!=typeof a&&null!==a?a:"",Q($.ajax({url:this.getReposUrl()+"/issues"+(a&&"/"+a)+this.concatToken()+(this.milestone?"&milestone="+this.milestone:""),type:"GET",dataType:"json"}))},getAssignees:function(){return Q($.ajax({url:this.getReposUrl()+"/assignees"+this.concatToken(),type:"GET",dataType:"json"}))},getRepos:function(){return Q($.ajax({url:this.REPO_BASE+"user/repos"+this.concatToken(),type:"get",dataType:"json"}))},addLabel:function(a,b){return Q($.ajax({url:[this.getReposUrl(),"issues",a,"labels"].join("/")+"?access_token="+this.access_token,type:"put",data:JSON.stringify(b),dataType:"json"}))},createLabel:function(a){return Q($.ajax({url:this.getReposUrl()+"/labels"+this.concatToken(),type:"post",data:JSON.stringify(a),dataType:"json"}))},deleteLabel:function(a,b){return Q($.ajax({url:this.getReposUrl()+"/issues/"+a+"/labels/"+b+this.concatToken(),type:"delete"}))},newIssue:function(a,b){return b="undefined"!=typeof b&&null!==b?b:"",Q($.ajax({url:this.getReposUrl()+"/issues"+this.concatToken(),type:"post",dataType:"json",data:JSON.stringify(a)}))},editIssue:function(a,b){return b="undefined"!=typeof b&&null!==b?b:"",Q($.ajax({url:this.REPO_BASE+["repos","issues"].join("/")+(b&&"/"+b)+this.concatToken(),type:"patch",dataType:"json",data:JSON.stringify(a)}))},markdown:function(a){return Q($.post(this.REPO_BASE+"markdown?access_token="+this.access_token,JSON.stringify(a)))},deleteLane:function(a){$.ajax({url:[this.getReposUrl(),"labels",a].join("/")+this.concatToken(),type:"delete"})},uploadImage:function(a){return Q($.ajax({url:this.getReposUrl()+"/contents/"+a.path+this.concatToken(),type:"put",dataType:"json",data:JSON.stringify(a)}))},createBranch:function(a,b){return Q($.ajax({url:this.getReposUrl()+"/git/refs"+this.concatToken(),type:"post",dataType:"json",data:JSON.stringify({ref:a,sha:b})}))},getRefSha:function(){return Q($.ajax({url:this.getReposUrl()+"/git/refs"+this.concatToken(),type:"get",dataType:"json"}))}};