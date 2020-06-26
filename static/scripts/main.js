var socket = io.connect(location.protocol+'//'+document.domain+':'+location.port);
socket.on('connect', function() {
    socket.emit('my event', 'I\'m connected!');
});

socket.on("messageToClients", function(chats) {
  var messages = document.getElementById("messages");
  var message = messages.firstElementChild;
  if (localStorage.getItem("channel").charAt(0)=='c')
  {
    Object.keys(chats["channelMessages"]["b'".concat(localStorage.getItem("channel").substring(2, localStorage.getItem("channel").length), "'")]).forEach(function(k)
    {
      if (k!="messageNumber" && !document.getElementById(k))
      {
        message=document.createElement("DIV");
        message.id=k;
        message.className="message";
        d=new Date(chats["channelMessages"]["b'".concat(localStorage.getItem("channel").substring(2, localStorage.getItem("channel").length), "'")][k]["time"]);
        if (chats["channelMessages"]["b'".concat(localStorage.getItem("channel").substring(2, localStorage.getItem("channel").length), "'")][k]["sender"]==localStorage.getItem("displayName"))
        {
          message.innerHTML=("<div class=\"bubble user-bubble\"><p class=\"sender\"><b>").concat(chats["channelMessages"]["b'".concat(localStorage.getItem("channel").substring(2, localStorage.getItem("channel").length), "'")][k]["sender"],"</b></p><p class=\"message-text\">", chats["channelMessages"]["b'".concat(localStorage.getItem("channel").substring(2, localStorage.getItem("channel").length), "'")][k]["text"], "</p><p class=\"date\">", d.getHours(), ":", Math.floor((d.getMinutes())/10), (d.getMinutes())%10, ", ", d.getDate(), "/", d.getMonth(), "/", d.getFullYear(),"</p></div>");
        }
        else {
          message.innerHTML=("<div class=\"bubble\"><p class=\"sender\"><b>").concat(chats["channelMessages"]["b'".concat(localStorage.getItem("channel").substring(2, localStorage.getItem("channel").length), "'")][k]["sender"],"</b></p><p class=\"message-text\">", chats["channelMessages"]["b'".concat(localStorage.getItem("channel").substring(2, localStorage.getItem("channel").length), "'")][k]["text"], "</p><p class=\"date\">", d.getHours(), ":", Math.floor((d.getMinutes())/10), (d.getMinutes())%10, ", ", d.getDate(), "/", d.getMonth(), "/", d.getFullYear(),"</p></div>");
        }
        messages.appendChild(message);
      }
    });
    while (message)
    {
      if (parseInt(message.id.substring(7, message.id.length))<chats["channelMessages"][("b'").concat(localStorage.getItem("channel").substring(2, localStorage.getItem("channel").length), "'")]["messageNumber"]-100)
      {
        messages.removeChild(message);
        message = messages.firstElementChild;
      }
      else
      {
        message=message.nextElementSibling;
      }
    }
  }
  else {
    var first=localStorage.getItem("displayName");
    var second=localStorage.getItem("channel").substring(2, localStorage.getItem("channel").length);

    if (first>second)
    {
      first=second;
      second=localStorage.getItem("displayName");
    }
    console.log(first, second, typeof first);
    console.log(chats);
    setTimeout(()=>{Object.keys(chats["pcMessages"][(first).toString()][second]).forEach(function(k)
    {
      if (k!="messageNumber" && !document.getElementById(k))
      {
        message=document.createElement("DIV");
        message.id=k;
        message.className="message";
        d=new Date(chats["pcMessages"][first][second][k]["time"]);
        if (chats["pcMessages"][first][second][k]["sender"]==localStorage.getItem("displayName"))
        {
          message.innerHTML=("<div class=\"bubble user-bubble\"><p class=\"sender\"><b>").concat(chats["pcMessages"][first][second][k]["sender"],"</b></p><p class=\"message-text\">", chats["pcMessages"][first][second][k]["text"], "</p><p class=\"date\">", d.getHours(), ":", Math.floor((d.getMinutes())/10), (d.getMinutes())%10, ", ", d.getDate(), "/", d.getMonth(), "/", d.getFullYear(),"</p></div>");
        }
        else {
          message.innerHTML=("<div class=\"bubble\"><p class=\"sender\"><b>").concat(chats["pcMessages"][first][second][k]["sender"],"</b></p><p class=\"message-text\">", chats["pcMessages"][first][second][k]["text"], "</p><p class=\"date\">", d.getHours(), ":", Math.floor((d.getMinutes())/10), (d.getMinutes())%10, ", ", d.getDate(), "/", d.getMonth(), "/", d.getFullYear(),"</p></div>");
        }
        messages.appendChild(message);
      }
    });
    while (message)
    {
      if (parseInt(message.id.substring(7, message.id.length))<chats["pcMessages"][first][second]["messageNumber"]-100)
      {
        messages.removeChild(message);
        message = messages.firstElementChild;
      }
      else
      {
        message=message.nextElementSibling;
      }
    }}, 0);
  }
  messages.scrollTop = messages.scrollHeight;
});

function signedIn()
{
  if (localStorage.getItem("channel"))
  {
    document.getElementById("channel-overlay").style.display="none";
    document.getElementById("channel-select").disabled=false;
    document.getElementById("send-btn").disabled=false;
    document.getElementById("new-message").disabled=false;
    document.getElementById("new-message").focus();
    if (localStorage.getItem("channel"))
    {
      setTimeout(()=>{document.getElementById("info").innerHTML=("<div id=\"display-name\">Name: <span style=\"color:white;\">").concat(localStorage.getItem("displayName"), "</span> &emsp; Chat: <span style=\"color:white;\">", localStorage.getItem("channel").substring(2, localStorage.getItem("channel").length),"</span></div>");}, 100);
    }
  }
  document.getElementById("hamburgerIntro").remove();
  document.getElementById("newUserForm").removeChild(document.getElementById("displayNameForm"));
  document.getElementById("newUserForm").removeChild(document.getElementById("right-title"));
  document.getElementById("newUserForm").style.padding="0";
  document.getElementById("message-box").style.display="flex";
  document.getElementById("channels").style.display="block";
  var e = document.getElementById("existing-users");
  var child = e.lastElementChild;
  while (child)
  {
    e.removeChild(child);
    child = e.lastElementChild;
  }
  document.getElementById("left-col").style.webkitAnimationPlayState = "running";
  document.getElementById("newUserForm").style.webkitAnimationPlayState = "running";
  document.querySelector("h1").style.webkitAnimationPlayState = "running";
  document.getElementById("user-list").innerHTML= "Direct Chat";
  updateExistingChannels();
  updateExistingUsers();
  if (localStorage.getItem("channel"))
  {
    setTimeout(()=>{document.getElementById("info").innerHTML=("<div id=\"display-name\">Name: <span style=\"color:white;\">").concat(localStorage.getItem("displayName"), "</span> &emsp; Chat: <span style=\"color:white;\">", localStorage.getItem("channel").substring(2, localStorage.getItem("channel").length),"</span></div>");}, 100);
  }
}

function createChannel()
{
  let channelname=document.getElementById('new-channel-name').value;
  let channel_unique=-1;
  document.getElementById('new-channel-name').value='';
  const request=new XMLHttpRequest();
  request.open('POST', '/add-channel');
  request.onload=()=>{
    if (parseInt(request.responseText, 10)==0 && document.getElementById("warning")==null)
    {
      alert("This channel already exists");
    }
    else if (parseInt(request.responseText, 10)==1)
    {
      document.getElementById("channel-overlay").style.display="none";
      document.getElementById("channel-select").disabled=false;
      document.getElementById("send-btn").disabled=false;
      document.getElementById("new-message").disabled=false;
      document.getElementById("new-message").focus();
      localStorage.setItem("channel", ("c-").concat(channelname));
      window.location.reload();
    }
  }
  request.send(channelname);
  return false;
}

function displayOverlay()
{
  document.getElementById("channel-overlay").style.display="block";
  document.getElementById("channel-select").disabled=true;
  document.getElementById("send-btn").disabled=true;
  document.getElementById("new-message").disabled=true;
  document.getElementById('new-channel-name').value='';
  document.getElementById("channel-overlay").onclick = function (e) {
    var ev = e || window.event;
    if(e.target !== this)
      return;
    if (localStorage.getItem("channel"))
    {
      document.getElementById("channel-overlay").style.display="none";
      document.getElementById("channel-select").disabled=false;
      document.getElementById("send-btn").disabled=false;
      document.getElementById("new-message").disabled=false;
      document.getElementById("new-message").focus();
    }
  }
}

function sizeCheck()
{
  document.getElementById("new-message").style.height="23px";
  document.getElementById("send-message").style.height="90px";
  if (document.getElementById("new-message").scrollHeight<70)
  {
    if (document.getElementById("new-message").scrollHeight!=document.getElementById("new-message").offsetHeight)
    {
      document.getElementById("new-message").style.height=(document.getElementById("new-message").scrollHeight-14).toString().concat("px");
      document.getElementById("send-message").style.height=(document.getElementById("new-message").scrollHeight+53).toString().concat("px");
    }
    document.getElementById("send-btn").style.top=(90-document.getElementById("send-message").offsetHeight).toString().concat("px");
  }
  else {
    document.getElementById("new-message").style.height="56px";
    document.getElementById("send-message").style.height="123px";
    document.getElementById("send-btn").style.top="-33px";
  }
}

function sendMessage()
{
  message=document.getElementById("new-message").value;
  message=message.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/(?:\r\n|\r|\n)/g, '<br>');
  document.getElementById("new-message").value="";
  var date = new Date();
  if (localStorage.getItem("channel").charAt(0)=='c')
  {
    socket.emit("messageToServer", "no", localStorage.getItem("channel").substring(2, localStorage.getItem("channel").length), message, date, localStorage.getItem("displayName"), ()=>{console.log("Emitted");});
  }
  else {
    socket.emit("messageToServer", "yes", localStorage.getItem("channel").substring(2, localStorage.getItem("channel").length), message, date, localStorage.getItem("displayName"), ()=>{console.log("Emitted");});
  }

}

function changeChannel(channel)
{
  localStorage.setItem("channel", ("c-").concat(channel.innerHTML));
  var e = document.getElementById("channel-select");
  for(var child=e.firstElementChild; child!==null; child=child.nextElementSibling)
  {
    child.style.backgroundColor="#0f2434";
  }
  channel.style.backgroundColor="#333333";
  closeMenu();
};

function updateExistingChannels()
{
  var e = document.getElementById("channel-select");
  var child = e.lastElementChild;
  while (child)
  {
      e.removeChild(child);
      child = e.lastElementChild;
  }
  const request=new XMLHttpRequest();
  request.open('POST', 'get-channels');
  request.onload=()=>
  {
    var obj=JSON.parse(request.responseText);
    if (obj.empty==0)
    {
      document.getElementById("channel-overlay").style.display="none";
      document.getElementById("channel-select").disabled=false;
      document.getElementById("send-btn").disabled=false;
      document.getElementById("new-message").disabled=false;
      document.getElementById("new-message").focus();
      if (!localStorage.getItem("channel"))
      {
        localStorage.setItem("channel", ("c-").concat((obj.data[0]).substring(2, (obj.data[0]).length-1)));
      }
      if (localStorage.getItem("channel"))
      {
        setTimeout(()=>{document.getElementById("info").innerHTML=("<div id=\"display-name\">Name: <span style=\"color:white;\">").concat(localStorage.getItem("displayName"), "</span> &emsp; Chat: <span style=\"color:white;\">", localStorage.getItem("channel").substring(2, localStorage.getItem("channel").length),"</span></div>");}, 100);
      }
      obj.data.forEach((channelname) => {
        var channel=document.createElement('DIV');
        channel.innerHTML=channelname.substring(2, channelname.length-1);
        channel.value=channelname.substring(2, channelname.length-1);
        channel.style.paddingLeft="20px";
        channel.onmouseover=()=>{channel.style.backgroundColor="#888888";};
        channel.onmouseleave=()=>
        {
          if (localStorage.getItem("channel")==("c-").concat(channel.innerHTML))
          {
            channel.style.backgroundColor="rgba(0,0,0,0.2)";
          }
          else
          {
            channel.style.backgroundColor="rgba(0,0,0,0)";
          }
        };
        channel.onclick=()=>{changeChannel(channel); window.location.reload();};
        document.getElementById("channel-select").appendChild(channel);
      });
      socket.emit("messageToServer", "blank", "", "", "", "", ()=>{});
    }
    else {
      displayOverlay();
    }
    var e = document.getElementById("channel-select");
    for(var child=e.firstElementChild; child!==null; child=child.nextElementSibling)
    {
      if (("c-").concat(child.innerHTML)==localStorage.getItem("channel"))
      {
        child.style.backgroundColor="rgba(0,0,0,0.2)";
      }
      else
      {
        child.style.backgroundColor="rgba(0,0,0,0)";
      }
    }
    var createOption=document.createElement("DIV");
    createOption.onclick=()=>{displayOverlay();};
    createOption.innerHTML="<b>Create channel</b>";
    createOption.style.color="#f0eeff";
    createOption.style.paddingLeft="20px";
    createOption.style.paddingTop="7px";
    createOption.style.paddingBottom="7px";
    createOption.id="last-option";
    createOption.onmouseover=()=>{createOption.style.backgroundColor="rgba(0,0,0,0.3)";};
    createOption.onmouseleave=()=>
    {
      createOption.style.backgroundColor="rgba(0,0,0,0)";
    };
    setTimeout(()=>{document.getElementById("channel-select").appendChild(createOption);},0);

  };
  request.send();
}

function updateExistingUsers()
{
  const request=new XMLHttpRequest();
  request.open('POST', 'get-users');
  request.onload=()=>
  {
    var obj=JSON.parse(request.responseText);
    if (obj.empty==0)
    {
      obj.data.forEach((username) => {
        {
          var user=document.createElement('DIV');
          user.innerHTML=username.substring(2, username.length-1);
          user.style.paddingLeft="20px";
          user.onmouseover=()=>{user.style.backgroundColor="#888888";};
          user.onmouseleave=()=>
          {
            if (localStorage.getItem("channel"))
            {
              if (localStorage.getItem("channel").charAt(0)=='d' && localStorage.getItem("channel").substring(2, localStorage.getItem("channel").length)==user.innerHTML)
              {
                user.style.backgroundColor="rgba(0,0,0,0.2)";
              }
              else
              {
                user.style.backgroundColor="rgba(0,0,0,0)";
              }
            }
            else
            {
              user.style.backgroundColor="rgba(0,0,0,0)";
            }
          };
        }
        user.onclick=()=>
        {
          if(!(localStorage.getItem("displayName")))
          {
            localStorage.setItem("displayName", user.innerHTML);
            signedIn();
          }
          else {
            localStorage.setItem("channel", "d-".concat(user.innerHTML));
            window.location.reload();
          }
        };
        document.getElementById("existing-users").appendChild(user);
      });
    }
    var e = document.getElementById("existing-users");
    for(var child=e.firstElementChild; child!==null; child=child.nextElementSibling)
    {
      if (child.innerHTML==localStorage.getItem("displayName"))
      {
        child.style.display="none";
        continue;
      }
      else if (localStorage.getItem("channel"))
      {
        if (localStorage.getItem("channel").charAt(0)=='d' && localStorage.getItem("channel").substring(2, localStorage.getItem("channel").length)==child.innerHTML)
        {
          child.style.backgroundColor="rgba(0,0,0,0.2)";
        }
        else
        {
          child.style.backgroundColor="rgba(0,0,0,0)";
        }
      }
      else
      {
        child.style.backgroundColor="rgba(0,0,0,0)";
      }
    }
    document.getElementById("existing-users").style.minHeight=(document.getElementById("existing-users").childElementCount*30.66).toString().concat("px");
  };
  request.send();
}

function defaultMenu(x) {
  if (x.matches)
  {
    document.getElementById("left-col").style.left="0";
    document.getElementById("left-col").style.animationName="shrink";
  }
  else
  {
    document.getElementById("left-col").style.left="-50%";
    document.getElementById("left-col").style.animationName="none";
    document.getElementById("left-col").style.width="50%";
  }
}
function openMenu() {
  if (document.getElementById("left-col").style.left!="0px")
  {
    document.getElementById("left-col").style.left="0";
    document.getElementById("left-col").style.animationName="none";
    document.getElementById("left-col").style.width="50%";
  }
  else {
    closeMenu();
  }
}
function closeMenu() {
  if (window.matchMedia("(max-width: 768px)").matches)
  {
    document.getElementById("left-col").style.left="-50%";
    document.getElementById("left-col").style.animationName="none";
    document.getElementById("left-col").style.width="50%";
  }
}

document.addEventListener('DOMContentLoaded', function() {
  defaultMenu(window.matchMedia("(min-width: 769px)"));
  (window.matchMedia("(min-width: 769px)")).addListener(defaultMenu);
  // (window.matchMedia("(max-width: 768px)")).addListener(closeMenu);
  document.getElementById("new-channel-name")
    .addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("create-channel-btn").click();
    }
  });
  updateExistingUsers();
  if (localStorage.getItem("displayName"))
  {
    document.getElementById("user-list").innerHTML="Direct Message";
    document.getElementById("newUserForm").removeChild(document.getElementById("displayNameForm"));
    document.getElementById("newUserForm").removeChild(document.getElementById("right-title"));
    document.getElementById("message-box").style.display="flex";
    document.getElementById("left-col").style.width = '30%';
    document.getElementById("newUserForm").style.width = '80%';
    document.querySelector("h1").style.webkitAnimationDirection = "reverse";
    document.querySelector("h1").style.fontSize = "50px";
    document.getElementById("left-col").style.webkitAnimationDirection = "reverse";
    document.getElementById("newUserForm").style.webkitAnimationDirection = "reverse";
    document.getElementById("user-list").innerHTML= "Direct Chat";
    document.getElementById("newUserForm").style.padding="0";
    document.getElementById("channels").style.display="block";
    document.getElementById("hamburgerIntro").remove();
    updateExistingChannels();
    if (localStorage.getItem("channel"))
    {
      setTimeout(()=>{document.getElementById("info").innerHTML=("<div id=\"display-name\">Name: <span style=\"color:white;\">").concat(localStorage.getItem("displayName"), "</span> &emsp; Chat: <span style=\"color:white;\">", localStorage.getItem("channel").substring(2, localStorage.getItem("channel").length),"</span></div>");}, 100);
    }
  }
  else
  {
    document.getElementById("user-list").innerHTML= "Existing Users";
    document.getElementById('displayNameForm').onsubmit=()=>
    {
      let username=document.getElementById('displayName').value;
      let user_unique=-1;
      document.getElementById('displayName').value='';
      const request=new XMLHttpRequest();
      request.open('POST', '/add-user');
      request.onload=()=>{
        if (parseInt(request.responseText, 10)==0 && document.getElementById("warning")==null)
        {
          alert("This username already exists");
        }
        else if (parseInt(request.responseText, 10)==1)
        {
          localStorage.setItem("displayName", username);
          signedIn();
        }
      };
      request.send(username);
      return false;
    };
  }
});
