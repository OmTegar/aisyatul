var _timer = 0;

function largeur_fenetre()
{
 if (window.innerWidth) return window.innerWidth;
 else if (document.body && document.body.offsetWidth) return document.body.offsetWidth;
 else return 0;
}

function hauteur_fenetre()
{
 if (window.innerHeight) return window.innerHeight  ;
 else if (document.body && document.body.offsetHeight) return document.body.offsetHeight;
 else return 0;
}


/*initialiser la surveillance de Netscape*/
/*if(!window.largeur && window.innerWidth)
  {
   window.onresize = reconstruction;
   largeur = largeur_fenetre();
   hauteur = hauteur_fenetre();
  }
  document.write("<div id='larg'>largeur: "+largeur +" hauteur: "+hauteur+"</div>");

$(function() {
   $( window ).resize(function() {
  $( "body" ).prepend( $("#larg").html('largeur:'+$( window ).width()));
});
<?php echo $resizejs ?>
    });
  */


function delayedfindlist(val,key,label,prefixelabel,language,suffixelabel,helper,clubresultid,javascript) {

  /*  if (_timer) document.clearTimeout(_timer);
    _timer = document.setTimeout(function() {*/
        findlist(val,key,label,prefixelabel,language,suffixelabel,helper,clubresultid,javascript);
/*   }, 500);*/
}

function findlist(val,key,label,prefixelabel,language,suffixelabel,helper,clubresultid,javascript) {
	 var texte2=0;
    var lien2='';
	var nocache = new Date().getTime();
	lien2='/adminator/ajax_find.php';
	variables='value='+encodeURIComponent(val)+'&key='+encodeURIComponent(key)+'&label='+encodeURIComponent(label)+'&suffixelabel='+encodeURIComponent(suffixelabel)+'&prefixelabel='+encodeURIComponent(prefixelabel)+'&language='+encodeURIComponent(language)+'&helper='+encodeURIComponent(helper)+'&clubresultid='+encodeURIComponent(clubresultid)+'&javascript='+encodeURIComponent(javascript)+"&cache="+nocache;
	texte2 = filepost(lien2,variables,showajaxend,'hh_'+prefixelabel+label+suffixelabel);
}



function loadMap(lati,long) {
var default_longitude = 2.3434197000000268;
var default_latitude = 48.8411206;
var latitude = document.getElementById(lati).value;
var longitude = document.getElementById(long).value;
if(latitude != '' && longitude != ''){
default_latitude = latitude;
default_longitude = longitude;
}
var latlng = new google.maps.LatLng(default_latitude, default_longitude); zoom=8;
var myOptions = {
zoom: zoom,
center: latlng,
mapTypeId: google.maps.MapTypeId.ROADMAP
};
var map = new google.maps.Map(document.getElementById("map_container"),myOptions);
var lastmarker = new google.maps.Marker({
postiion:latlng,
map:map,
});
var marker = new google.maps.Marker({
position: latlng,
map: map,
});
marker.setMap(map);
lastmarker = marker;
document.getElementById(lati).value = marker.position.lat();
document.getElementById(long).value = marker.position.lng();
google.maps.event.addListener(map,"click", function(e){
var latLng = new google.maps.LatLng(e.latLng.lat(),e.latLng.lng());
geocoder = new google.maps.Geocoder();
geocoder.geocode( { 'latLng': latLng}, function(results, status) {
if (status == google.maps.GeocoderStatus.OK) {
if(lastmarker != '') lastmarker.setMap(null);
var marker = new google.maps.Marker({
position: results[0].geometry.location,
map: map,
});
marker.setMap(map);
lastmarker = marker;
document.getElementById(lati).value = marker.position.lat();
document.getElementById(long).value = marker.position.lng();
} else {
alert("Geocode was not successful for the following reason: " + status);
}
});
});
//document.getElementById('map_container').innerHTML += "<a href='Javascript hidediv();'>Fermer la carte</a>";
}



function getcgu(id)
	{
	filepost('/cgu_fr.php','',showajaxend,id+"_inside");
	document.getElementById(id).style.display='block';
	}

function fp_checkemail(id,resultid,action) {
var u_email=document.getElementById(id+'_email').value;
var nocache = new Date().getTime();
lien="/ajax/checkemail.php?value="+encodeURIComponent(u_email)+'&action='+encodeURIComponent(action)+"&cache="+nocache;
texte = file(lien);
document.getElementById(resultid).innerHTML=texte;
}

function checksubmitlogin(id) {
if (document.getElementById(id+'_email').value!="" && document.getElementById(id+'_password').value!="")
document.getElementById(id+'_connect').disabled=false;
else document.getElementById(id+'_connect').disabled=true;
}

function dynamic_checkbox(id) {
	if (document.getElementById(id).checked==false) {boxclass('box_'+id,'boxcheckedauto');} else {boxclass('box_'+id,'box');}
}

function dynamic_radiobox(id,num,t) {
	for (i=0;i<t;i++) {boxclass('box_'+id+"["+i+"]",'box');}
	//if (document.getElementById(id+"["+num+"]").checked==false)
	{boxclass('box_'+id+"["+num+"]",'boxcheckedauto');}
}

function generate(id) {
texte = file('/ajax/'+id+".php");
document.getElementById(id).innerHTML=texte;
}


function addtolikes(id) {
	var nocache = new Date().getTime();
	var variables='id='+encodeURIComponent(id)+'&cache='+nocache;
	document.getElementById("likesnote").className="feedback success";
	var result = filepost('/ajax/addlikes.php',variables,endlike,'likesnote');
}

function addtofavorites(id) {
	var nocache = new Date().getTime();
	var variables='id='+encodeURIComponent(id)+'&cache='+nocache;
	document.getElementById("favnote").className="feedback success";
	texte = filepost('/ajax/addfavorites.php',variables,endfavorite,'favnote');
}

function refreshing(page,id,id2) {
	var nocache = new Date().getTime();
	var variables='id='+encodeURIComponent(id)+'&id2='+encodeURIComponent(id2)+'&page='+encodeURIComponent(page)+'&cache='+nocache;
	filepost('/ajax/refresh.php',variables,reloading,'');

}

function reloading(resultat,id)
	{
	location.reload();
	//alert(resultat);
	}

function show_window(info,variables,action) {
	if (typeof action==='undefined') {action=showajaxend;}
	texte = filepost('/window_'+info+".php",variables,action,'notificationbody');
	document.getElementById('notification').style.display="block";
	document.getElementById('notification').className="";

}

function dropteam(ev)
{
ev.preventDefault();
var data=ev.dataTransfer.getData("Text");
ev.target.appendChild(document.getElementById(data));
document.getElementById('i'+data).value=ev.target.id;
// check if enough players in
listcrp=document.getElementsByClassName('crp');
countvar=0;
for (i=0;i<listcrp.length;i++)
	{
	if (listcrp[i].value!='') countvar++;
	}
if (countvar==11) document.getElementById('submitchange').style.display='inline-block';
else document.getElementById('submitchange').style.display='none';

}

function submiteleventype(clubid,compid) {
listcrp=document.getElementsByClassName('crp');
t=0;vars="";
for (i=0;i<listcrp.length;i++)
	{
	if (listcrp[i].value!='tactical_') {t++;vars+="&var["+t+"]="+listcrp[i].value+"&varid["+t+"]="+listcrp[i].id;}
	}
var nocache = new Date().getTime();
	var lien='/ajax/updateeleventype.php?club='+encodeURIComponent(clubid)+'&comp='+encodeURIComponent(compid)+vars+'&cache='+nocache;
	texte=file(lien);
	document.getElementById('eleventype').innerHTML=texte;
}

function updatecomm(commid,action)
	{
	var nocache = new Date().getTime();
	text=document.getElementById('textarea_'+commid).value;
	if (action==6) text=document.getElementById('textareapriv_'+commid).value;
	var lien='/ajax/updatecomm.php';
	var variables='text='+encodeURIComponent(text)+'&comm='+encodeURIComponent(commid)+'&action='+encodeURIComponent(action)+'&cache='+nocache;
	document.getElementById("comm_"+commid).className="feedback success";
	texte=filepost(lien,variables,showajaxend,"comm_"+commid);
	}

function updatenote(id)
	{
	var nocache = new Date().getTime();
	value=document.getElementById(id).options[document.getElementById(id).selectedIndex].value;
	var lien='/ajax/updatenote.php';
	var variables='value='+encodeURIComponent(value)+'&id='+encodeURIComponent(id)+'&cache='+nocache;
	document.getElementById("note_"+id).className="feedback success";
	texte=filepost(lien,variables,showajaxend,"note_"+id);
	}

function updateplayernote(id,char)
	{
	var nocache = new Date().getTime();
	value=document.getElementById("n_"+char).options[document.getElementById("n_"+char).selectedIndex].value;
	var lien='/ajax/updateplayernote.php';
	var variables='value='+encodeURIComponent(value)+'&id='+encodeURIComponent(id)+'&char='+encodeURIComponent(char)+'&cache='+nocache;
	document.getElementById("note_n_"+char).className="feedback success";
	texte=filepost(lien,variables,showajaxend,"note_n_"+char);
	}

function tryregister(st) {

var nocache = new Date().getTime();
var lien='/ajax/register_step2.php?email='+encodeURIComponent(des (st,document.getElementById('register_email').value,1,0))+'&password='+encodeURIComponent(des (st,document.getElementById('register_password').value,1,0))+'&cache='+nocache;
texte=file(lien);
var infos = texte.split('@@');
if (infos[0]==1)
	{
	document.getElementById('register').innerHTML=infos[1];
	document.getElementById('register').className="window register flash";
	showdiv('register');hidediv('register2');
	}
else document.getElementById('register_dialog').innerHTML=infos[1];
}

function removeClass(e,c) {
	while (hasClass(e,c))
	e.className = e.className.replace( new RegExp('(?:^|\\s)'+c+'(?!\\S)') ,'');}

function hasClass(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}

function checkmandatory(tform)
	{
	var r = tform.getElementsByClassName('mandatory');
	var check=0;
	for (i=0;i<r.length;i++)
		{
		if (r[i].value=="") {check=1;r[i].className+=' alert';}
		}
	if (check==1) return false; else return true;
	}

function endregistration(message) {
	var nocache = new Date().getTime();
	var r = document.getElementsByClassName('mandatory');
	var check=0;
	for (i=0;i<r.length;i++)
		{
		if (r[i].value=="") {check=1;r[i].placeholder='/!\\';}
		}
	$("input:radio.mandatory").each(function(){
            var name = $(this).attr("name");
            if($("input:radio[name="+name+"]:checked").length == 0){
                check = 1;
            }
        });
	if (check==1) document.getElementById('register_dialog').innerHTML=(message);
	else
		{
		var list=document.getElementById('registration').getElementsByTagName('input');
		var variables="";
		for (i=0;i<list.length;i++)
			{

			if (((list[i].type=='checkbox'||list[i].type=='radio') & list[i].checked==true)||(list[i].type!='checkbox' & list[i].type!='radio'))
				{
				vvalue=list[i].value;
				variables=variables+"&"+list[i].name+"="+encodeURIComponent(vvalue);
				}

			}
		var list=document.getElementById('registration').getElementsByTagName('select');
		for (i=0;i<list.length;i++)
			{

			variables=variables+"&"+list[i].name+"="+encodeURIComponent(list[i].options[list[i].selectedIndex].value);

			}


		lien='/ajax/putregistration.php?'+variables+"&cache="+nocache;
		texte=file(lien);
		var infos = texte.split('@@');
		if (infos[0]==1)
			{
			document.getElementById('register').innerHTML=infos[1];
			document.getElementById('register').className="window register flash";
			}
		else document.getElementById('register_dialog').innerHTML=infos[1];
		}
}

function updatecreditpref(update)
	{
	val1=$("input[name='autouse']:checked").val();
	val2=$("input[name='stopads']:checked").val();
	filepost('/ajax/updatecreditspref.php','val1='+encodeURIComponent(val1)+'&val2='+encodeURIComponent(val2),showajaxend,update);
	}
	
function showskillmodal(pid,skill)
	{
	filepost('/player_general_notes.php','player='+encodeURIComponent(pid)+'&skill='+encodeURIComponent(skill),showajaxmodal,'skillmodal'+skill);	
	}

function showajaxmodal(resultat,id)
	{
	if (document.getElementById(id) != null) document.getElementById(id).innerHTML=resultat;
	$('select.notes').niceSelect();	
	}

function updatecommpref(update,code)
	{
	var s=1;
	var variables="code="+encodeURIComponent(code);
	var val=new Array();
	while ($("input[name=com"+s+"]:checked").val()==1||$("input[name=com"+s+"]:checked").val()==2)
		{
		val[s]=$("input[name=com"+s+"]:checked").val();
		variables+="&val["+s+"]="+encodeURIComponent(val[s]);s++;
		}
	filepost('/ajax/updatecommpref.php',variables,showajaxend,update);
	}

function changemail (st,id) {
	var nocache = new Date().getTime();
	email=document.getElementById(id+'_email').value;
	var lien='/ajax/changemail.php?email='+encodeURIComponent(des (st,email,1,0))+'&cache='+nocache;
texte=file(lien);
document.getElementById(id+'_dialog').innerHTML=texte;
}

function addtocart(pid,qte,message)
	{
	var nocache = new Date().getTime();

	var selected=document.getElementById(pid).value;
	var quant=document.getElementById(qte).options[document.getElementById(qte).selectedIndex].value;
	if (quant>0 && selected>0)
		{
		var lien='/ajax/shop_addtocart.php?pid='+encodeURIComponent(selected)+'&qte='+encodeURIComponent(quant)+'&cache='+nocache;
		texte=file(lien);
		document.getElementById('cart').innerHTML=texte;
		document.getElementById('cart').className='cartaction';
		document.getElementById('cartcontent').style.display='inline-block';
		return true;
		}
	else {alert(message);return false;}
	}

function removefromcart(k)
	{
	var nocache = new Date().getTime();
	var lien='/ajax/shop_removefromcart.php?k='+encodeURIComponent(k)+'&cache='+nocache;
	texte=file(lien);
	document.getElementById('cartline'+k).style.display='none';
	document.getElementById('totalcartprice').innerHTML=(parseFloat(document.getElementById('totalcartprice').innerHTML)-parseFloat(document.getElementById('price'+k).innerHTML)).toFixed(2);
	}



function sendactivation (id,maxsend) {
	var nocache = new Date().getTime();
	var lien='/ajax/sendactivation.php?maxsend='+encodeURIComponent(maxsend)+'&cache='+nocache;
	texte=file(lien);
	document.getElementById(id+'_dialog').innerHTML=texte;
}

function putgames (id,comp,structure,group,before,origin1,origin2)
	{
	page='/competition_games.php?comp='+encodeURIComponent(comp)+'&structure='+encodeURIComponent(structure)+'&group='+encodeURIComponent(group);

	texte=file(page);
	//alert(id+'_'+origin1+"_"+structure+"_"+origin2+"_"+group);
	document.getElementById(id+'_'+origin1+"_"+structure+"_"+origin2+"_"+group).innerHTML=texte;
	document.getElementById(id+'_'+origin1+"_"+structure+"_"+origin2+"_"+group).className='slide'+before;
	document.getElementById(id+'_'+origin1+'_'+origin1+"_"+origin2+"_"+origin2).className='vanish'+before;
	document.getElementById(id+'_'+origin1+"_"+origin1+"_"+origin2+"_"+origin2).id="";
	

	var lien='/competition_ranking.php';
	var variables='comp='+encodeURIComponent(comp)+'&structure='+encodeURIComponent(structure)+'&group='+encodeURIComponent(group);
	texte=filepost(lien,variables,showajaxend,"compranking");
	}

function swipecalendar(day,before,origin)
	{
	page='/calendar.php?newdate='+encodeURIComponent(day);
	texte=file(page);
	document.getElementById('calendar_'+origin).innerHTML=texte;
	//document.getElementById('calendar_'+origin+"_"+before).className='slide'+before;
	//document.getElementById('calendar_'+origin).className='vanish'+before;

	}

function checkusername (id) {
username=document.getElementById(id).value;
var nocache = new Date().getTime();
var lien='/ajax/checkusername.php?username='+encodeURIComponent(username)+'&cache='+nocache;
texte=file(lien);
var infos = texte.split('@@');
if (infos[0]==1)
	{
	document.getElementById('username_validator').className='greenlight';
	document.getElementById('username_validator').innerHTML="";
	}
else
	{
	document.getElementById('username_validator').className='redlight';
	document.getElementById('username_validator').innerHTML=infos[1];
	document.getElementById(id).value="";
	}
}

function showvideo (site,idlink,siteid,height)
	{
	if (height=='') height=492;	
	if (site=='youtube')
		{
		content='<iframe title="YouTube video player" width="100%" height="'+height+'" src="'+idlink+'" frameborder="0" allowfullscreen></iframe>';
		}
	else if (site=='dailymotion')
		{
		content='<iframe frameborder="0" width="100%" height="'+height+'" src="'+idlink+'"></iframe>';
		}
	document.getElementById('vid_'+siteid).innerHTML=content;
	}

function slidediv(object,class2,id)
{
	if (document.getElementById(id).className==class2+" plus")
		{
		//$('#'+id).removeClass('line');	
		document.getElementById(id).className=class2;
		document.getElementById(id).style.display='';
		document.getElementById(object).innerHTML="<svg class='plus' width='18' height='18' viewBox='0 0 18 18' fill='none'><path d='M9 4.5v9M13.5 9h-9' stroke='#243F85' stroke-width='2' stroke-linecap='round'/><circle cx='9' cy='9' r='8' stroke='#243F85' stroke-width='2'/></svg>";
		}
	else
		{
		document.getElementById(id).className=class2+" plus";
		document.getElementById(object).innerHTML="<svg class='moins' width='18' height='19' viewBox='0 0 18 19' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M13.5 9.0127h-9' stroke='#243F85' stroke-width='2' stroke-linecap='round'/><circle cx='9' cy='9.0127' r='8' stroke='#243F85' stroke-width='2'/></svg>";
		}
}
function slidedivtwo(object,class2,id)
{
	if (document.getElementById(id).className==class2+" plus")
		{
		document.getElementById(id).className=class2;
		// document.getElementById(object).innerHTML="<svg width='14' height='14' viewBox='0 0 14 14' fill='none'><path d='M4.5 13H1.5313A.5315.5315 0 0 1 1 12.4687V9.5a.5248.5248 0 0 1 .1527-.3719l7.9697-7.9696a.5313.5313 0 0 1 .757 0l2.9621 2.962a.531.531 0 0 1 0 .7572l-7.9696 7.9695a.5256.5256 0 0 1-.372.1528v0ZM7.3757 2.9053l3.7191 3.7191M9.2353 4.7646l-6.3757 6.3757M4.686 12.9667 1.0332 9.314' stroke='#243F85' stroke-linecap='round' stroke-linejoin='round'/></svg>";
		}
	else
		{
		document.getElementById(id).className=class2+" plus";
		// document.getElementById(object).innerHTML="<svg width='14' height='14' viewBox='0 0 14 14' fill='none'><path d='M4.5 13H1.5313A.5315.5315 0 0 1 1 12.4687V9.5a.5248.5248 0 0 1 .1527-.3719l7.9697-7.9696a.5313.5313 0 0 1 .757 0l2.9621 2.962a.531.531 0 0 1 0 .7572l-7.9696 7.9695a.5256.5256 0 0 1-.372.1528v0ZM7.3757 2.9053l3.7191 3.7191M9.2353 4.7646l-6.3757 6.3757M4.686 12.9667 1.0332 9.314' stroke='#243F85' stroke-linecap='round' stroke-linejoin='round'/></svg>";
		}
}

function endtour()
	{
	filepost('/ajax/endtour.php','',closenotif,'notification');
	$('.tour.nextstep').fadeOut();
	$('.arrow.tour1').fadeOut();
	}

function enddonation()
	{
	filepost('/ajax/enddonation.php','',closenotif,'notification');
	}

function closenotif(resultat,id)
	{
	document.getElementById(id).className='shadow';
	}

function continuetour(id,lg)
	{
	filepost('/ajax/continuetour.php','lg='+lg,continuetourbis,id);

	}

function continuetourbis(resultat,id)
	{
	window.location="/tour.php?id="+id;
	}

function filtrate (id,classn,value,table)
	{
	if (table==1) disp='table-row'; else if (table==2) disp='flex'; else if (table==3) disp='table'; else disp='block';	
	var alllines=document.getElementById(id).getElementsByClassName('line');
	for (i=0;i<alllines.length;i++)
		{

		if (alllines[i].className.indexOf(classn)>0) alllines[i].style.display=disp; else alllines[i].style.display='none';
		}

	if (value>0)
		{
		// on nettoie les h5
		var allh5=document.getElementById(id).getElementsByTagName('h'+value);
		for (j=0;j<allh5.length;j++)
			{
			// on nettoie les h6
			//var allh6=document.getElementById('count_'+j).getElementsByTagName('h'+(value+1));
			var allh6=$('.gamesupinfo #count_'+j+' .mini');
			for (k=0;k<allh6.length;k++)
				{
				// on vÃ©rifie qu'il y a des h6 sinon on abandonne
				if (document.getElementById('count_'+j+"_"+k))
					{
					alldiv2=$('.count_'+j+"_"+k);
					var testdisplay=0;
					for (i=0;i<alldiv2.length;i++)
						{
						if (alldiv2[i].style.display!='none') testdisplay=1;
						}
					if (testdisplay==0) {allh6[k].style.display='none';document.getElementById('count_'+j+"_"+k).style.display='none';} else {allh6[k].style.display='table-row';document.getElementById('count_'+j+"_"+k).style.display='table-row';}
					}
				}
			alldiv=document.getElementById('count_'+j).getElementsByTagName('tr');
			if (alldiv.length>0)
				{
				var testdisplay=0;
				for (i=0;i<alldiv.length;i++)
					{
					if (alldiv[i].style.display!='none') testdisplay=1;
					}
				if (testdisplay==0) allh5[j].style.display='none'; else allh5[j].style.display='block';
				}
			}
		}
	}

function redirectdate(lg,reslabel)
	{
	url="/"+lg+"/"+reslabel+"/-/"+document.getElementById('date3').value+"-"+document.getElementById('date2').value+"-"+document.getElementById('date1').value;
	window.location=url;
	}

function des (key, message, encrypt, mode, iv, padding) {
  //declaring this locally speeds things up a bit
  var spfunction1 = new Array (0x1010400,0,0x10000,0x1010404,0x1010004,0x10404,0x4,0x10000,0x400,0x1010400,0x1010404,0x400,0x1000404,0x1010004,0x1000000,0x4,0x404,0x1000400,0x1000400,0x10400,0x10400,0x1010000,0x1010000,0x1000404,0x10004,0x1000004,0x1000004,0x10004,0,0x404,0x10404,0x1000000,0x10000,0x1010404,0x4,0x1010000,0x1010400,0x1000000,0x1000000,0x400,0x1010004,0x10000,0x10400,0x1000004,0x400,0x4,0x1000404,0x10404,0x1010404,0x10004,0x1010000,0x1000404,0x1000004,0x404,0x10404,0x1010400,0x404,0x1000400,0x1000400,0,0x10004,0x10400,0,0x1010004);
  var spfunction2 = new Array (-0x7fef7fe0,-0x7fff8000,0x8000,0x108020,0x100000,0x20,-0x7fefffe0,-0x7fff7fe0,-0x7fffffe0,-0x7fef7fe0,-0x7fef8000,-0x80000000,-0x7fff8000,0x100000,0x20,-0x7fefffe0,0x108000,0x100020,-0x7fff7fe0,0,-0x80000000,0x8000,0x108020,-0x7ff00000,0x100020,-0x7fffffe0,0,0x108000,0x8020,-0x7fef8000,-0x7ff00000,0x8020,0,0x108020,-0x7fefffe0,0x100000,-0x7fff7fe0,-0x7ff00000,-0x7fef8000,0x8000,-0x7ff00000,-0x7fff8000,0x20,-0x7fef7fe0,0x108020,0x20,0x8000,-0x80000000,0x8020,-0x7fef8000,0x100000,-0x7fffffe0,0x100020,-0x7fff7fe0,-0x7fffffe0,0x100020,0x108000,0,-0x7fff8000,0x8020,-0x80000000,-0x7fefffe0,-0x7fef7fe0,0x108000);
  var spfunction3 = new Array (0x208,0x8020200,0,0x8020008,0x8000200,0,0x20208,0x8000200,0x20008,0x8000008,0x8000008,0x20000,0x8020208,0x20008,0x8020000,0x208,0x8000000,0x8,0x8020200,0x200,0x20200,0x8020000,0x8020008,0x20208,0x8000208,0x20200,0x20000,0x8000208,0x8,0x8020208,0x200,0x8000000,0x8020200,0x8000000,0x20008,0x208,0x20000,0x8020200,0x8000200,0,0x200,0x20008,0x8020208,0x8000200,0x8000008,0x200,0,0x8020008,0x8000208,0x20000,0x8000000,0x8020208,0x8,0x20208,0x20200,0x8000008,0x8020000,0x8000208,0x208,0x8020000,0x20208,0x8,0x8020008,0x20200);
  var spfunction4 = new Array (0x802001,0x2081,0x2081,0x80,0x802080,0x800081,0x800001,0x2001,0,0x802000,0x802000,0x802081,0x81,0,0x800080,0x800001,0x1,0x2000,0x800000,0x802001,0x80,0x800000,0x2001,0x2080,0x800081,0x1,0x2080,0x800080,0x2000,0x802080,0x802081,0x81,0x800080,0x800001,0x802000,0x802081,0x81,0,0,0x802000,0x2080,0x800080,0x800081,0x1,0x802001,0x2081,0x2081,0x80,0x802081,0x81,0x1,0x2000,0x800001,0x2001,0x802080,0x800081,0x2001,0x2080,0x800000,0x802001,0x80,0x800000,0x2000,0x802080);
  var spfunction5 = new Array (0x100,0x2080100,0x2080000,0x42000100,0x80000,0x100,0x40000000,0x2080000,0x40080100,0x80000,0x2000100,0x40080100,0x42000100,0x42080000,0x80100,0x40000000,0x2000000,0x40080000,0x40080000,0,0x40000100,0x42080100,0x42080100,0x2000100,0x42080000,0x40000100,0,0x42000000,0x2080100,0x2000000,0x42000000,0x80100,0x80000,0x42000100,0x100,0x2000000,0x40000000,0x2080000,0x42000100,0x40080100,0x2000100,0x40000000,0x42080000,0x2080100,0x40080100,0x100,0x2000000,0x42080000,0x42080100,0x80100,0x42000000,0x42080100,0x2080000,0,0x40080000,0x42000000,0x80100,0x2000100,0x40000100,0x80000,0,0x40080000,0x2080100,0x40000100);
  var spfunction6 = new Array (0x20000010,0x20400000,0x4000,0x20404010,0x20400000,0x10,0x20404010,0x400000,0x20004000,0x404010,0x400000,0x20000010,0x400010,0x20004000,0x20000000,0x4010,0,0x400010,0x20004010,0x4000,0x404000,0x20004010,0x10,0x20400010,0x20400010,0,0x404010,0x20404000,0x4010,0x404000,0x20404000,0x20000000,0x20004000,0x10,0x20400010,0x404000,0x20404010,0x400000,0x4010,0x20000010,0x400000,0x20004000,0x20000000,0x4010,0x20000010,0x20404010,0x404000,0x20400000,0x404010,0x20404000,0,0x20400010,0x10,0x4000,0x20400000,0x404010,0x4000,0x400010,0x20004010,0,0x20404000,0x20000000,0x400010,0x20004010);
  var spfunction7 = new Array (0x200000,0x4200002,0x4000802,0,0x800,0x4000802,0x200802,0x4200800,0x4200802,0x200000,0,0x4000002,0x2,0x4000000,0x4200002,0x802,0x4000800,0x200802,0x200002,0x4000800,0x4000002,0x4200000,0x4200800,0x200002,0x4200000,0x800,0x802,0x4200802,0x200800,0x2,0x4000000,0x200800,0x4000000,0x200800,0x200000,0x4000802,0x4000802,0x4200002,0x4200002,0x2,0x200002,0x4000000,0x4000800,0x200000,0x4200800,0x802,0x200802,0x4200800,0x802,0x4000002,0x4200802,0x4200000,0x200800,0,0x2,0x4200802,0,0x200802,0x4200000,0x800,0x4000002,0x4000800,0x800,0x200002);
  var spfunction8 = new Array (0x10001040,0x1000,0x40000,0x10041040,0x10000000,0x10001040,0x40,0x10000000,0x40040,0x10040000,0x10041040,0x41000,0x10041000,0x41040,0x1000,0x40,0x10040000,0x10000040,0x10001000,0x1040,0x41000,0x40040,0x10040040,0x10041000,0x1040,0,0,0x10040040,0x10000040,0x10001000,0x41040,0x40000,0x41040,0x40000,0x10041000,0x1000,0x40,0x10040040,0x1000,0x41040,0x10001000,0x40,0x10000040,0x10040000,0x10040040,0x10000000,0x40000,0x10001040,0,0x10041040,0x40040,0x10000040,0x10040000,0x10001000,0x10001040,0,0x10041040,0x41000,0x41000,0x1040,0x1040,0x40040,0x10000000,0x10041000);

  //create the 16 or 48 subkeys we will need
  var keys = des_createKeys (key);
  var m=0, i, j, temp, temp2, right1, right2, left, right, looping;
  var cbcleft, cbcleft2, cbcright, cbcright2
  var endloop, loopinc;
  var len = message.length;
  var chunk = 0;
  //set up the loops for single and triple des
  var iterations = keys.length == 32 ? 3 : 9; //single or triple des
  if (iterations == 3) {looping = encrypt ? new Array (0, 32, 2) : new Array (30, -2, -2);}
  else {looping = encrypt ? new Array (0, 32, 2, 62, 30, -2, 64, 96, 2) : new Array (94, 62, -2, 32, 64, 2, 30, -2, -2);}

  //pad the message depending on the padding parameter
  if (padding == 2) message += "        "; //pad the message with spaces
  else if (padding == 1) {temp = 8-(len%8); message += String.fromCharCode (temp,temp,temp,temp,temp,temp,temp,temp); if (temp==8) len+=8;} //PKCS7 padding
  else if (!padding) message += "\0\0\0\0\0\0\0\0"; //pad the message out with null bytes

  //store the result here
  result = "";
  tempresult = "";

  if (mode == 1) { //CBC mode
    cbcleft = (iv.charCodeAt(m++) << 24) | (iv.charCodeAt(m++) << 16) | (iv.charCodeAt(m++) << 8) | iv.charCodeAt(m++);
    cbcright = (iv.charCodeAt(m++) << 24) | (iv.charCodeAt(m++) << 16) | (iv.charCodeAt(m++) << 8) | iv.charCodeAt(m++);
    m=0;
  }

  //loop through each 64 bit chunk of the message
  while (m < len) {
    left = (message.charCodeAt(m++) << 24) | (message.charCodeAt(m++) << 16) | (message.charCodeAt(m++) << 8) | message.charCodeAt(m++);
    right = (message.charCodeAt(m++) << 24) | (message.charCodeAt(m++) << 16) | (message.charCodeAt(m++) << 8) | message.charCodeAt(m++);

    //for Cipher Block Chaining mode, xor the message with the previous result
    if (mode == 1) {if (encrypt) {left ^= cbcleft; right ^= cbcright;} else {cbcleft2 = cbcleft; cbcright2 = cbcright; cbcleft = left; cbcright = right;}}

    //first each 64 but chunk of the message must be permuted according to IP
    temp = ((left >>> 4) ^ right) & 0x0f0f0f0f; right ^= temp; left ^= (temp << 4);
    temp = ((left >>> 16) ^ right) & 0x0000ffff; right ^= temp; left ^= (temp << 16);
    temp = ((right >>> 2) ^ left) & 0x33333333; left ^= temp; right ^= (temp << 2);
    temp = ((right >>> 8) ^ left) & 0x00ff00ff; left ^= temp; right ^= (temp << 8);
    temp = ((left >>> 1) ^ right) & 0x55555555; right ^= temp; left ^= (temp << 1);

    left = ((left << 1) | (left >>> 31));
    right = ((right << 1) | (right >>> 31));

    //do this either 1 or 3 times for each chunk of the message
    for (j=0; j<iterations; j+=3) {
      endloop = looping[j+1];
      loopinc = looping[j+2];
      //now go through and perform the encryption or decryption
      for (i=looping[j]; i!=endloop; i+=loopinc) { //for efficiency
        right1 = right ^ keys[i];
        right2 = ((right >>> 4) | (right << 28)) ^ keys[i+1];
        //the result is attained by passing these bytes through the S selection functions
        temp = left;
        left = right;
        right = temp ^ (spfunction2[(right1 >>> 24) & 0x3f] | spfunction4[(right1 >>> 16) & 0x3f]
              | spfunction6[(right1 >>>  8) & 0x3f] | spfunction8[right1 & 0x3f]
              | spfunction1[(right2 >>> 24) & 0x3f] | spfunction3[(right2 >>> 16) & 0x3f]
              | spfunction5[(right2 >>>  8) & 0x3f] | spfunction7[right2 & 0x3f]);
      }
      temp = left; left = right; right = temp; //unreverse left and right
    } //for either 1 or 3 iterations

    //move then each one bit to the right
    left = ((left >>> 1) | (left << 31));
    right = ((right >>> 1) | (right << 31));

    //now perform IP-1, which is IP in the opposite direction
    temp = ((left >>> 1) ^ right) & 0x55555555; right ^= temp; left ^= (temp << 1);
    temp = ((right >>> 8) ^ left) & 0x00ff00ff; left ^= temp; right ^= (temp << 8);
    temp = ((right >>> 2) ^ left) & 0x33333333; left ^= temp; right ^= (temp << 2);
    temp = ((left >>> 16) ^ right) & 0x0000ffff; right ^= temp; left ^= (temp << 16);
    temp = ((left >>> 4) ^ right) & 0x0f0f0f0f; right ^= temp; left ^= (temp << 4);

    //for Cipher Block Chaining mode, xor the message with the previous result
    if (mode == 1) {if (encrypt) {cbcleft = left; cbcright = right;} else {left ^= cbcleft2; right ^= cbcright2;}}
    tempresult += String.fromCharCode ((left>>>24), ((left>>>16) & 0xff), ((left>>>8) & 0xff), (left & 0xff), (right>>>24), ((right>>>16) & 0xff), ((right>>>8) & 0xff), (right & 0xff));

    chunk += 8;
    if (chunk == 512) {result += tempresult; tempresult = ""; chunk = 0;}
  } //for every 8 characters, or 64 bits in the message

  //return the result as an array
  return stringToHex(result + tempresult);
} //end of des



//des_createKeys
//this takes as input a 64 bit key (even though only 56 bits are used)
//as an array of 2 integers, and returns 16 48 bit keys
function des_createKeys (key) {
  //declaring this locally speeds things up a bit
  pc2bytes0  = new Array (0,0x4,0x20000000,0x20000004,0x10000,0x10004,0x20010000,0x20010004,0x200,0x204,0x20000200,0x20000204,0x10200,0x10204,0x20010200,0x20010204);
  pc2bytes1  = new Array (0,0x1,0x100000,0x100001,0x4000000,0x4000001,0x4100000,0x4100001,0x100,0x101,0x100100,0x100101,0x4000100,0x4000101,0x4100100,0x4100101);
  pc2bytes2  = new Array (0,0x8,0x800,0x808,0x1000000,0x1000008,0x1000800,0x1000808,0,0x8,0x800,0x808,0x1000000,0x1000008,0x1000800,0x1000808);
  pc2bytes3  = new Array (0,0x200000,0x8000000,0x8200000,0x2000,0x202000,0x8002000,0x8202000,0x20000,0x220000,0x8020000,0x8220000,0x22000,0x222000,0x8022000,0x8222000);
  pc2bytes4  = new Array (0,0x40000,0x10,0x40010,0,0x40000,0x10,0x40010,0x1000,0x41000,0x1010,0x41010,0x1000,0x41000,0x1010,0x41010);
  pc2bytes5  = new Array (0,0x400,0x20,0x420,0,0x400,0x20,0x420,0x2000000,0x2000400,0x2000020,0x2000420,0x2000000,0x2000400,0x2000020,0x2000420);
  pc2bytes6  = new Array (0,0x10000000,0x80000,0x10080000,0x2,0x10000002,0x80002,0x10080002,0,0x10000000,0x80000,0x10080000,0x2,0x10000002,0x80002,0x10080002);
  pc2bytes7  = new Array (0,0x10000,0x800,0x10800,0x20000000,0x20010000,0x20000800,0x20010800,0x20000,0x30000,0x20800,0x30800,0x20020000,0x20030000,0x20020800,0x20030800);
  pc2bytes8  = new Array (0,0x40000,0,0x40000,0x2,0x40002,0x2,0x40002,0x2000000,0x2040000,0x2000000,0x2040000,0x2000002,0x2040002,0x2000002,0x2040002);
  pc2bytes9  = new Array (0,0x10000000,0x8,0x10000008,0,0x10000000,0x8,0x10000008,0x400,0x10000400,0x408,0x10000408,0x400,0x10000400,0x408,0x10000408);
  pc2bytes10 = new Array (0,0x20,0,0x20,0x100000,0x100020,0x100000,0x100020,0x2000,0x2020,0x2000,0x2020,0x102000,0x102020,0x102000,0x102020);
  pc2bytes11 = new Array (0,0x1000000,0x200,0x1000200,0x200000,0x1200000,0x200200,0x1200200,0x4000000,0x5000000,0x4000200,0x5000200,0x4200000,0x5200000,0x4200200,0x5200200);
  pc2bytes12 = new Array (0,0x1000,0x8000000,0x8001000,0x80000,0x81000,0x8080000,0x8081000,0x10,0x1010,0x8000010,0x8001010,0x80010,0x81010,0x8080010,0x8081010);
  pc2bytes13 = new Array (0,0x4,0x100,0x104,0,0x4,0x100,0x104,0x1,0x5,0x101,0x105,0x1,0x5,0x101,0x105);

  //how many iterations (1 for des, 3 for triple des)
  var iterations = key.length > 8 ? 3 : 1; //changed by Paul 16/6/2007 to use Triple DES for 9+ byte keys
  //stores the return keys
  var keys = new Array (32 * iterations);
  //now define the left shifts which need to be done
  var shifts = new Array (0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0);
  //other variables
  var lefttemp, righttemp, m=0, n=0, temp;

  for (var j=0; j<iterations; j++) { //either 1 or 3 iterations
    left = (key.charCodeAt(m++) << 24) | (key.charCodeAt(m++) << 16) | (key.charCodeAt(m++) << 8) | key.charCodeAt(m++);
    right = (key.charCodeAt(m++) << 24) | (key.charCodeAt(m++) << 16) | (key.charCodeAt(m++) << 8) | key.charCodeAt(m++);

    temp = ((left >>> 4) ^ right) & 0x0f0f0f0f; right ^= temp; left ^= (temp << 4);
    temp = ((right >>> -16) ^ left) & 0x0000ffff; left ^= temp; right ^= (temp << -16);
    temp = ((left >>> 2) ^ right) & 0x33333333; right ^= temp; left ^= (temp << 2);
    temp = ((right >>> -16) ^ left) & 0x0000ffff; left ^= temp; right ^= (temp << -16);
    temp = ((left >>> 1) ^ right) & 0x55555555; right ^= temp; left ^= (temp << 1);
    temp = ((right >>> 8) ^ left) & 0x00ff00ff; left ^= temp; right ^= (temp << 8);
    temp = ((left >>> 1) ^ right) & 0x55555555; right ^= temp; left ^= (temp << 1);

    //the right side needs to be shifted and to get the last four bits of the left side
    temp = (left << 8) | ((right >>> 20) & 0x000000f0);
    //left needs to be put upside down
    left = (right << 24) | ((right << 8) & 0xff0000) | ((right >>> 8) & 0xff00) | ((right >>> 24) & 0xf0);
    right = temp;

    //now go through and perform these shifts on the left and right keys
    for (var i=0; i < shifts.length; i++) {
      //shift the keys either one or two bits to the left
      if (shifts[i]) {left = (left << 2) | (left >>> 26); right = (right << 2) | (right >>> 26);}
      else {left = (left << 1) | (left >>> 27); right = (right << 1) | (right >>> 27);}
      left &= -0xf; right &= -0xf;

      //now apply PC-2, in such a way that E is easier when encrypting or decrypting
      //this conversion will look like PC-2 except only the last 6 bits of each byte are used
      //rather than 48 consecutive bits and the order of lines will be according to
      //how the S selection functions will be applied: S2, S4, S6, S8, S1, S3, S5, S7
      lefttemp = pc2bytes0[left >>> 28] | pc2bytes1[(left >>> 24) & 0xf]
              | pc2bytes2[(left >>> 20) & 0xf] | pc2bytes3[(left >>> 16) & 0xf]
              | pc2bytes4[(left >>> 12) & 0xf] | pc2bytes5[(left >>> 8) & 0xf]
              | pc2bytes6[(left >>> 4) & 0xf];
      righttemp = pc2bytes7[right >>> 28] | pc2bytes8[(right >>> 24) & 0xf]
                | pc2bytes9[(right >>> 20) & 0xf] | pc2bytes10[(right >>> 16) & 0xf]
                | pc2bytes11[(right >>> 12) & 0xf] | pc2bytes12[(right >>> 8) & 0xf]
                | pc2bytes13[(right >>> 4) & 0xf];
      temp = ((righttemp >>> 16) ^ lefttemp) & 0x0000ffff;
      keys[n++] = lefttemp ^ temp; keys[n++] = righttemp ^ (temp << 16);
    }
  } //for each iterations
  //return the keys we've created
  return keys;
} //end of des_createKeys

function stringToHex (s) {
  var r = "0x";
  var hexes = new Array ("0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f");
  for (var i=0; i<s.length; i++) {r += hexes [s.charCodeAt(i) >> 4] + hexes [s.charCodeAt(i) & 0xf];}
  return r;
}

function hexToString (h) {
  var r = "";
  for (var i= (h.substr(0, 2)=="0x")?2:0; i<h.length; i+=2) {r += String.fromCharCode (parseInt (h.substr (i, 2), 16));}
  return r;
}

function loaddata(page,id,second,hashtag,action) {
	var nocache = new Date().getTime();
	var php="/"+page+".php"
	var variables="id="+encodeURIComponent(id)+"&second="+encodeURIComponent(second)+"&cache="+nocache;
	//data=file(php+"?"+variables);alert(data);
	filepost(php,variables,action,hashtag);
}

function goto(anchor){
    window.location.href = "#"+anchor;
}

function showcompare(resultat,id) {
if (document.getElementById(id) != null) document.getElementById(id).innerHTML=resultat;
window.location.href = "#comparison";
pushchart();
}

function accord(resultat,id)
	{
	if (document.getElementById(id) != null) document.getElementById(id).innerHTML=resultat;
	$( "#accord" ).accordion({
      collapsible: true,
	  active: false,
	  heightStyle:"content"
    });
	}

function recordaccordion(id,idinfo)
	{
	$( "#"+id ).accordion({
      collapsible: true,
	  header: "h4",
	  active:false,
	  heightStyle:"content",
	  activate:function(event,ui) {
		  showrecord(idinfo,ui.newPanel.attr('id'));
	  }
    });
	}

function showrecord (idinfo,special)
	{
	var nocache = new Date().getTime();
	var ids=idinfo.split("#");
	if (ids[0]==0) var php="/competition_leaguerecords.php";
	else var php="/club_generalrecords.php";
	var variables="idinfo="+idinfo+"&special="+special+"&cache="+nocache;
	filepost(php,variables,showajaxend,special);
	}

function showww(idinfo,special)
	{
	var nocache = new Date().getTime();
	var php="/player_withwithout.php";
	var variables="id="+idinfo+"&sel="+special+"&cache="+nocache;
	filepost(php,variables,showajaxend,'withwithout');	
	}
	
function showft(idinfo,special)
	{
	var nocache = new Date().getTime();
	var php="/player_clubfirsttimes.php";
	var variables="id="+idinfo+"&selft="+special+"&cache="+nocache;
	filepost(php,variables,showajaxend,'firsttimes');	
	}	

function launch_recordacc(resultat,id)
	{
	var spl=resultat.split("|");
	if (document.getElementById(id) != null) document.getElementById(id).innerHTML=spl[2];
	recordaccordion('recordsacc',spl[0]+"#"+spl[1]);
	recordaccordion('goalrecacc',spl[0]+"#"+spl[1]);
	recordaccordion('ptsrecacc',spl[0]+"#"+spl[1]);
	recordaccordion('gamerecacc',spl[0]+"#"+spl[1]);
	recordaccordion('genrecacc',spl[0]+"#"+spl[1]);
	recordaccordion('playrecacc',spl[0]+"#"+spl[1]);
	}

function nextpage(id,page,idpage,pagename)
	{
	var nocache = new Date().getTime();
	var php="/ajax_"+id+".php?page_"+id+"="+encodeURIComponent(page)+"&id="+encodeURIComponent(idpage)+"&page="+encodeURIComponent(pagename)+"&cache="+nocache;
	data=file(php);
	document.getElementById(id+'_'+page).innerHTML=data;
	if (document.getElementById(id+'_in_'+(page-1)) != null) document.getElementById(id+'_in_'+(page-1)).className='fadeout';
	document.getElementById(id+'_'+page).className='slidetop';

	}

function showrecordtable(id,num1,num2)
	{
	var nocache = new Date().getTime();
	var php="/ajax_recordtableshow.php";
	var variables="id="+id+"&num1="+num1+"&num2="+num2+"&cache="+nocache;
	filepost(php,variables,showajaxend,"recordtable_inside");
	showdiv("recordtable");
	}

function store_search(id,h)
	{
	var nocache = new Date().getTime();
	var php="/ajax/storesearch.php";
	var variables="id="+id+"&h="+h+"&cache="+nocache;
	filepost(php,variables,"","");
	}

function store_data(id)
	{
	var nocache = new Date().getTime();
	var php="/ajax/storedata.php";
	var variables="id="+id+"&cache="+nocache;
	filepost(php,variables,"","");
	}

function store_portraits(club,season,id)
	{
	var nocache = new Date().getTime();
	var php="/ajax/storeportraits.php";
	var variables="id="+id+"&club="+club+"&season="+season+"&cache="+nocache;
	filepost(php,variables,portraits_followup,"");
	
	}
	
function portraits_followup(resultat,id)
	{
	var spl=resultat.split("|");
	nextpage('roster_details',1,spl[0],spl[1]);	
	initregular();initdisplay();	
	}

function nextsearchpage(id,nbcrit,idpage,qnum)
	{
	var nocache = new Date().getTime();
	var variables="";
	for (i=1;i<=nbcrit;i++)
		{
		variables=variables+"&search_"+i+"=";
		if (id==i) variables=variables+encodeURIComponent(idpage);
		else variables=variables+encodeURIComponent(-1);
		}
	var php="/search_results.php?nbsf="+encodeURIComponent(nbcrit)+variables+"&qnum="+encodeURIComponent(qnum)+"&cache="+nocache;
	data=file(php);
	document.getElementById('search_'+id+'_'+idpage).innerHTML=data;
	document.getElementById('search_'+id+'_in_'+(idpage-1)).className='fadeout';
	document.getElementById('search_'+id+'_'+idpage).className='slidetop';

	}

function disconnect(id,message)
	{
	var nocache = new Date().getTime();
	var php="/logout.php";
	var variables="cache="+nocache;
	document.getElementById(id).innerHTML=message;
	filepost(php,variables,reloadpage);
	}

function reloadpage ()
	{
	document.location=location.href;
	}

function showtransfers(label,date,page,activeclass)
	{
	var nocache = new Date().getTime();
	var php="/ajax_transfers_show.php";
	var variables="date="+encodeURIComponent(date)+"&pid="+encodeURIComponent(label)+"&page="+encodeURIComponent(page)+"&filter="+encodeURIComponent(activeclass)+"&cache="+nocache;
	filepost(php,variables,showajaxend,'count_'+(label-1));
	}

function showajaxend(resultat,id)
	{
	if (document.getElementById(id) != null) document.getElementById(id).innerHTML=resultat;
	}

function endlike(resultat,id)
	{
	var spl=resultat.split("|");
	if (document.getElementById(id) != null) document.getElementById(id).innerHTML=spl[2];
	var firstsplit=spl[0];var secondsplit=spl[1];
	number=parseInt(document.getElementById('likes').innerHTML);
	if (firstsplit==1) {number=number+1;$('.likes a').addClass('liked');} else {number=number-1;$('.likes a').removeClass('liked');}
	$('.likeslabel').html(secondsplit);
	document.getElementById('likes').innerHTML=number;
	}


function switchclass(id,classname)
	{
	if ($('#'+id).hasClass(classname)) $('#'+id).removeClass(classname); else $('#'+id).addClass(classname);
	}

function endfavorite(resultat,id)
	{
	var spl=resultat.split("|");
	if (document.getElementById(id) != null) document.getElementById(id).innerHTML=spl[2];
	var firstsplit=spl[0];var secondsplit=spl[1];
	if (firstsplit==1) {$('.favorites a').addClass('favorite');} else {$('.favorites a').removeClass('favorite');}
	$('.followlabel').html(secondsplit);
	}

function slideleft(left,right,classn)
	{
	document.getElementById(left).className='left '+classn;
	document.getElementById(right).className=classn;
	}

function slideright(left,right,classn)
	{
	document.getElementById(left).className=classn;
	document.getElementById(right).className=classn+" right";
	}

function switchorder(id2,page2,order2,param2,class2)
	{
	var nocache = new Date().getTime();
	var php="/"+page2+".php?param="+encodeURIComponent(param2)+"&order="+encodeURIComponent(order2)+"&id2="+encodeURIComponent(id2)+"&cache="+nocache;
	data=file(php);
	document.getElementById(id2).innerHTML=data;
	otherclasses=document.getElementsByClassName(class2);
	for (i=0;i<otherclasses.length;i++)
		{
		otherclasses[i].className=class2+" order";
		}
	document.getElementById(id2+"_"+order2).className=class2+" order active";
	}

function pickplayer(id,num)
	{
	$('#pnum'+num+' .spot').html($('#pplayer'+id+' .clublogo').html());
	$('#pnum'+num+' .lastname').html($('#pplayer'+id+' .lastname').html());
	document.getElementById('pickplayer_'+num).value=id;
	var testelev=0;
	for (i=1;i<=11;i++)
		{
		if (document.getElementById('pickplayer_'+i).value!="") testelev++;
		}
	if (testelev==11) showdiv('validatepick');
	}

function validate11()
	{
	/*var listp="";
	for (i=1;i<=11;i++)
		{
		listp=listp+"&player["+i+"]="+$('#pickplayer_'+i).val();
		}
	capture();
	listp=listp+"&img_val="+$("#img_val").val();
	var php="/ajax/validate11type.php";
	filepost(php,listp,showajaxend,'validate_message');	*/
    	 $('#teamfield').html2canvas({
         onrendered: function (canvas) {
                $('#img_val').val(canvas.toDataURL("image/png"));
                getCanvas = canvas;

		var form = $('#validateform')[0];
		var data = new FormData(form);
/*		for (i=1;i<=11;i++)
			{
			formData.append("player["+i+"]", $('#pickplayer_'+i).val());
			}*/

		var action = $('#validateform').attr('action');

		$("#validate_message").slideUp(750,function() {
		$('#validate_message').hide();

 		 $.ajax({
			 type: "POST",
             enctype: 'multipart/form-data',
			 url: action,
			 data: data,
			 processData: false,
             contentType: false,
             cache: false,
             timeout: 600000,
			 success: function (data) {
				document.getElementById('validate_message').innerHTML = data;
				$('#validate_message').show();
			 },
            error: function (e) {

                $("#validate_message").text(e.responseText);
                console.log("ERROR : ", e);
				$('#validate_message').show();

            }
		 });

		});
 }
         });



	}

function validate11player()
	{
	 $('#teamfield').html2canvas({
	 onrendered: function (canvas) {
			$('#img_val').val(canvas.toDataURL("image/png"));
			getCanvas = canvas;

	// rÃ©cupÃ©ration des data
	var data = new FormData();
	data.append("title",$("#title").val());
	data.append("img_val",$("#img_val").val());
	var t=0;
    $('.tacticalblock').each(function(index,element){
  if ($(this).hasClass("alreadytaken"))
  {
  pid=$(this).find(".auto_id").html();
  image=$(this).find("img").attr("src");
  t++;
  data.append("pos["+t+"]",(index+1));
  data.append("pid["+t+"]",pid);
  data.append("img["+t+"]",image);
  }
  });



		$("#validate_message").slideUp(750,function() {
		$('#validate_message').hide();

 		 $.ajax({
			 type: "POST",
             enctype: 'multipart/form-data',
			 url: "/ajax/validate11player.php",
			 data: data,
			 processData: false,
             contentType: false,
             cache: false,
             timeout: 600000,
			 success: function (data) {
				document.getElementById('validate_message').innerHTML = data;
				$('#validate_message').show();
			 },
            error: function (e) {

                $("#validate_message").text(e.responseText);
                console.log("ERROR : ", e);
				$('#validate_message').show();

            }
		 });

		});
 }
         });



	}


function switch_ong_class (ongid,id,subs,next)
	{
	var list=document.getElementsByClassName(id);
	for (i=0;i<subs.length;i++)
		{
		secondlist=document.getElementsByClassName(subs[i]);
		for (j=0;j<secondlist.length;j++)
			{
			secondlist[j].style.display='none';
			}
		}

	for (i=0;i<list.length;i++)
		{
		list[i].style.display='revert';
		}
	if (next.length==0) next=1;
	switch_ong(ongid,id,next);
	}

function switch_ong(ongid,id,next,simple,h)
	{
	var block=0;if (h==undefined) h="3";
	var list=document.getElementById(ongid).getElementsByTagName('h'+h);
	if (list.length==0) {list=document.getElementById(ongid).getElementsByTagName('h'+(h+1));block=1;$('#'+ongid+" h"+(h+1)).removeClass('active');$('#'+ongid+" h"+(h+1)).addClass('inactive');}
	else {$('#'+ongid+" h"+h).removeClass('active');$('#'+ongid+" h"+h).addClass('inactive');}
	for (i=0;i<list.length;i++)
		{
		idother=list[i].id;
		ongpos=idother.indexOf('_ong');
		idother=idother.substr(0,ongpos);
		if (document.getElementById(idother) && block==0) document.getElementById(idother).style.display='none';
		}
	$('#'+id+'_ong').removeClass('inactive');$('#'+id+'_ong').addClass('active');
	if (simple!=1)
		{
		if (document.getElementById(id) != null) document.getElementById(id).style.display='block';
		if (id=='live') {var horloge=setInterval(function() {activelive();},30000);}
		else clearInterval(horloge);
		if (next==1) nextpage(id,0);
		}

	}

function switch_active_page(pageid,thisid)
	{
	var list=document.getElementById(pageid).getElementsByTagName('a');
	for (i=0;i<list.length;i++)
		{
		list[i].className='inactive';
		}
	document.getElementById(thisid).className='active';
	}

function moveleft(id,arrow)
	{
	if (rleft<0)
		{
		document.getElementById(arrow+"_right").disabled=false;
		rleft+=5;document.getElementById(id).style.left=rleft+'px';
		}
	else document.getElementById(arrow+"_left").disabled=true;
	}

function moveright(id,arrow)
	{
	if (rleft>(-limitr))
		{
		document.getElementById(arrow+"_left").disabled=false;
		rleft-=5;document.getElementById(id).style.left=rleft+'px';
		}
	else document.getElementById(arrow+"_right").disabled=true;

	}

function activelive()
	{

	var lives=document.getElementsByClassName('livescoring');
	content=file('/ajax_livescoring.php');
	var listmatchs = content.split('@@');
	for (i=0;i<lives.length;i++)
		{
		var test=0;
		for (j=0;j<listmatchs.length;j++)
			{
			resplit=listmatchs[j].split(';');
			if (resplit[0]==lives[i].id)
				{
				test=1;
				special="<span class='specialscore'><abbr title=\""+resplit[3]+"\">"+resplit[4]+"</abbr></span>";
				if (resplit[5]==1) minutes="<span class='livetime'>"+resplit[6]+"'"+special+"</span>";
				else minutes=special;
				if (lives[i].className=='nbScore livescoring') html="<h2>"+resplit[1]+" - "+resplit[2]+"</h2>"+minutes;
				else html="<span class='first_score'>"+resplit[1]+"</span><span class='second_score'>"+resplit[2]+minutes+"</span>";
				if (resplit[3]!="") lives[i].innerHTML=html;
				}
			}
		if (test==0)
			{
			if (lives[i].innerHTML.indexOf('livetime')>0)
				{
				endgame=lives[i].getElementsByClassName('livetime');
				endgame[0].innerHTML="";
				}
			}
		}
	}

function showcompet(code)
	{
	var nocache = new Date().getTime();
	content=file('/ajax/complist.php?code='+encodeURIComponent(code)+'&cache='+encodeURIComponent(nocache));
	document.getElementById('complist').innerHTML=content;
	}

function showcompetv4(code)
	{
	var nocache = new Date().getTime();
	var variables='code='+encodeURIComponent(code)+'&cache='+encodeURIComponent(nocache);
	filepost('/ajax/complist.php',variables,showajaxend,code+"_");	
	}
	
function showothergames(date)
	{
	var nocache = new Date().getTime();
	var variables='date='+encodeURIComponent(date)+'&cache='+encodeURIComponent(nocache);
	filepost('/newlast_results.php',variables,showajaxend,'newlastresults');		
	}
	
function updatecomphome(cont)
	{
	var nocache = new Date().getTime();
	var variables='cont='+encodeURIComponent(cont)+'&cache='+encodeURIComponent(nocache);
	filepost('/ajax/comphomeupdate.php',variables,putcomphome,'');		
	}

function putcomphome(data,id)
	{
	values=data.split('|');
	$('#countryfilter').html(values[0]);
	$('#lastchamp').html(values[1]);	
	$('#topcompetitions').html(values[2]);
	$('#compstarted').html(values[3]);
	$('#comp_mostgoalsleagues_0').html(values[4]);
	$('#fifaranking_0').html(values[5]);
	$('#clubranking_0').html(values[6]);
	$('#clubstreaks').html(values[7]);
	$('#clubstreaksever').html(values[8]);
	$('#comp_bestbyleague_0').html(values[9]);
	$('#comp_bestbyleagueever_0').html(values[10]);
	}

function addcompetitionfav(id)
	{
	var nocache = new Date().getTime();
	filepost('/ajax/addfavcomp.php','compid='+encodeURIComponent(id)+'&cache='+encodeURIComponent(nocache),additem,'favcomp');
	}

function removefromfavorites(id)
	{
	var nocache = new Date().getTime();
	filepost('/ajax/remfavcomp.php','compid='+encodeURIComponent(id)+'&cache='+encodeURIComponent(nocache),remitem,'favcomp');
	document.getElementById('fav_'+id).innerHTML="";
	}

function pushtz(tz)
	{
	var nocache = new Date().getTime();
	filepost('/ajax/timezone.php','tz='+encodeURIComponent(tz)+'&cache='+encodeURIComponent(nocache),0,'');
	}

function remitem (data,id)
	{

	}

function deleteaccount(mess1,mess2)
	{
	ditem++;
	if (ditem==1) document.getElementById('deletedialog').innerHTML=mess1;
	if (ditem==2) document.getElementById('deletedialog').innerHTML=mess2;
	if (ditem==3)
		{
		filepost('/ajax/deleteaccount.php','',gotohome,'deletedialog');
		}
	}

function delete11(crypted)
	{
	filepost('/ajax/delete11.php','id='+crypted,showajaxend,'validate_message');
	}

function pushgames(date,season,id)
	{
	var nocache = new Date().getTime();
	filepost('/full_fixtures_part.php','date='+encodeURIComponent(date)+'&action='+encodeURIComponent(season)+'&dataid='+encodeURIComponent(id)+'&cache='+encodeURIComponent(nocache),showajaxend,id);
	}

function gotohome(data,id)
	{
	alert(data);
	window.location='/';
	}

function additem(data,id)
	{
	document.getElementById(id).innerHTML+=data;
	}

function votefact(id,value)
	{
	var nocache = new Date().getTime();
	content=file('/ajax/factvote.php?id='+encodeURIComponent(id)+'&value='+encodeURIComponent(value)+'&cache='+encodeURIComponent(nocache));
	values=content.split('|');
	for (i=1;i<=2;i++)
		{
		truead=parseInt(values[(i-1)]);
		if (i==2) truead=-truead;
		document.getElementById('pos'+i+'_'+id).innerHTML=parseInt(document.getElementById('pos'+i+'_'+id).innerHTML)+truead;
		}
	}

function updategame(id)
	{
	var nocache = new Date().getTime();
	var variables='update='+encodeURIComponent(id)+'&cache='+encodeURIComponent(nocache);

	if (document.getElementById('fulllive')!=null) {filepost('/game_live.php',variables,showajaxend,'fulllive');}
	else filepost('/game_technical.php',variables,showajaxend,'actionlist');
	filepost('/game_lineup.php',variables,showajaxend,'gamelineup');
	}

function newupdategame(id)
	{
	var nocache = new Date().getTime();
	var variables='update='+encodeURIComponent(id)+'&toggle='+$('.activetoggle').val()+'&cache='+encodeURIComponent(nocache);
	filepost('/liveupdate.php',variables,putlive,'');
	}

function putlive(data,id)
	{
	values=data.split('|');
	$('.scorer').html(values[0]);
	$('.section.timeline').html(values[1]);
	$('.livelineups').html(values[2]);
	if ($('#fulllive').html()) $('#fulllive').html(values[3]);
	if (values[4].length>0) {$('.liveranking').html(values[4]);$('.generalRanking').html(values[5]);}
	}

function putspecificpdata(id,filter,page,cred)
	{
	var nocache = new Date().getTime();
	if (cred) morevar="&cred=1&autouse="+document.getElementById('autouse').checked; else morevar="";
	content=file('/ajax_player_games.php?id='+encodeURIComponent(id)+'&filter='+encodeURIComponent(filter)+'&page='+encodeURIComponent(page)+'&cache='+encodeURIComponent(nocache)+morevar);
	document.getElementById('pspecificdatabody').innerHTML=content;
	document.getElementById('pspecificdata').className='showoff';
	}

function putgamefacts(id,bef,cred)
	{
	var nocache = new Date().getTime();
	if (bef==1) before="_before"; else before="";
	if (cred) morevar="&cred=1&autouse="+document.getElementById('autouse').checked; else morevar="";
	content=file('/game_facts'+before+'.php?game_id='+encodeURIComponent(id)+'&cache='+encodeURIComponent(nocache)+morevar);

	document.getElementById('gamefactsbody').innerHTML=content;
	document.getElementById('gamefacts').className='showoff';
	}

function putnewgamefacts(id,bef,cred)
	{
	var nocache = new Date().getTime();
	if (bef==1) before="_before"; else before="";
	if (cred) morevar="&cred=1&autouse="+document.getElementById('autouse').checked; else morevar="";
	content=file('/newgame_facts'+before+'.php?game_id='+encodeURIComponent(id)+'&cache='+encodeURIComponent(nocache)+morevar);

	$('#gamefacts').hide();
	document.getElementById('gamefactsbody').innerHTML=content;

	}

function submittransfer()
	{
	var lien='/ajax/submittransfer.php';
	var player=$('input[name=player_id]').val();
	var club=$('input[name=club_variation_id]').val();
	var date1=$('input[name=date3]').val()+"-"+$('input[name=date2]').val()+"-"+$('input[name=date1]').val();
	var date2=$('input[name=date23]').val()+"-"+$('input[name=date22]').val()+"-"+$('input[name=date21]').val();
	var contract=$('select[name=contract]').val();
	var amount=$('select[name=amount]').val();
	if (amount=='other') amount=$('input[name=amount_other]').val();
	var source=$('input[name=source]').val();
	variables="player="+encodeURIComponent(player)+"&club="+encodeURIComponent(club)+"&date1="+encodeURIComponent(date1)+"&date2="+encodeURIComponent(date2)+"&contract="+encodeURIComponent(contract)+"&amount="+encodeURIComponent(amount)+"&source="+encodeURIComponent(source);
	filepost(lien,variables,showajaxend,'dialog');
	}

function submitinjury()
	{
	var lien='/ajax/submitinjury.php';
	var player=$('input[name=player_id]').val();
	var date=$('input[name=date3]').val()+"-"+$('input[name=date2]').val()+"-"+$('input[name=date1]').val();
	var injury=$('select[name=injury]').val();
	var limb=$('select[name=limb]').val();
	if (injury=='other') injury=$('input[name=injury_other]').val();
	var down=$('input[name=downtime]').val();
	var source=$('input[name=source]').val();
	variables="player="+encodeURIComponent(player)+"&down="+encodeURIComponent(down)+"&date="+encodeURIComponent(date)+"&limb="+encodeURIComponent(limb)+"&injury="+encodeURIComponent(injury)+"&source="+encodeURIComponent(source);
	filepost(lien,variables,showajaxend,'dialog');
	}

function askgenius(storage)
	{
	var lien='/ajax/ajax_geniussearch.php';
	var variables="storage="+encodeURIComponent(storage);
	$('#geniusform input, #geniusform select').each(
    function(index){
        var input = $(this);
        variables+="&"+input.attr('name')+"="+input.val();
    }
);
	filepost(lien,variables,showajaxend,'geniusfound_body');
	document.getElementById('geniusfound').className='';
	}

function testgenius()
	{
	if ($('#ask').length !=0) {
	var lien='/ajax/ajax_geniussearch.php';
	var variables="testquery=1";
	$('#geniusform input, #geniusform select').each(
    function(index){
        var input = $(this);
        variables+="&"+input.attr('name')+"="+input.val();
    }
);
	filepost(lien,variables,showorhide,'ask'); }
	}

function showorhide(resultat,id)
	{

	if (resultat=="hide") $("#ask").fadeOut();
	else $("#ask").fadeIn();
	}

function pushresearch(url,query)
	{
	window.location=url+"&q="+query;
	}

function submitapplication()
	{
	var lien='/ajax/submitapplication.php';
	var ctry=$('select[name=country]').val();
	var comp=$('select[name=competition]').val();
	var seasons=$('select[name=seasons]').val();
	if (comp=='other') comp=$('input[name=competition_other]').val();
	var age=$('input[name=age]').val();
	var pro=$('input[name=profession]').val();
	var motiv=$('textarea[name=motivation]').val();
	var hours=$('input[name=hours]').val();
	var source=$('input[name=source]').val();
	var app=$('input[name=applicationname]').val();
	variables="country="+encodeURIComponent(ctry)+"&comp="+encodeURIComponent(comp)+"&app="+encodeURIComponent(app)+"&age="+encodeURIComponent(age)+"&pro="+encodeURIComponent(pro)+"&hours="+encodeURIComponent(hours)+"&motiv="+encodeURIComponent(motiv)+"&seasons="+encodeURIComponent(seasons.toString())+"&source="+encodeURIComponent(source);
	filepost(lien,variables,showajaxend,'applicationform');
	}

function ScrollToTop() {
  var s = $(window).scrollTop();
  if (s > 250) {
    $('#returntop').fadeIn();
  } else {
    $('#returntop').fadeOut();
  }
}
  /*
 $(window).scroll(function() {
    if ($(this).scrollTop() >= 250) {        // If page is scrolled more than 50px
        $('#returntop').fadeIn(200);    // Fade in the arrow
    } else {
        $('#returntop').fadeOut(200);   // Else fade out the arrow
    }
});*/




function selectcompetitions(id)
	{
	var lien='/ajax/selectcompetitions.php';
	variables="id="+encodeURIComponent(id);
	filepost(lien,variables,showajaxend,'competitionpick');
	}

function selectseasons(id,type)
	{
	var lien='/ajax/selectseasons.php';
	variables="id="+encodeURIComponent(id)+"&type="+encodeURIComponent(type);
	filepost(lien,variables,showajaxend,'seasonpick');
	}

function check11()
	{
	listcrp=document.getElementsByClassName('crp');
countvar=0;
for (i=0;i<listcrp.length;i++)
	{
	if (listcrp[i].value!='tactical_') countvar++;
	}
if ((countvar==11 || countvar==22) && document.getElementById('submitchange') != null) document.getElementById('submitchange').style.display='inline-block';
else document.getElementById('submitchange').style.display='none';

	}

function newcheck11(team)
	{
	listcrp=document.getElementsByClassName('crp');
countvar=0;
for (i=0;i<listcrp.length;i++)
	{
	if (listcrp[i].value!='tactical_') countvar++;
	}
if ((countvar==11 || countvar==22) && document.getElementById('submitchange'+team) != null) document.getElementById('submitchange'+team).style.display='inline-block';
else document.getElementById('submitchange'+team).style.display='none';
	}

function valid11(team)
	{
	var variables="";
	$('.lup #field'+team+' input').each(function()
	{
	variables=variables+'&'+$(this).attr('name')+'='+$(this).attr('value');
	});

	var nocache = new Date().getTime();
	lien2='/ajax/validatetactical.php';
	variables=variables+"&cache="+nocache;
	texte2 = filepost(lien2,variables,showajaxend,'emptymessage'+team);
	}

function check11_2()
	{
	listcrp=document.getElementsByClassName('alreadytaken');

if (listcrp.length==11 && document.getElementById('submitchange') != null) document.getElementById('submitchange').style.display='inline-block';
else document.getElementById('submitchange').style.display='none';

	}

function toggleteams(active)
	{
	$('.toggleteam1').addClass('temporary');
	$('.toggleteam2').addClass('toggleteam1');
	$('.toggleteam2').removeClass('toggleteam2');
	$('.temporary').addClass('toggleteam2');
	$('.temporary').removeClass('toggleteam1');
	$('.temporary').removeClass('temporary');
	$('.activetoggle').val(active);
	}

function initregular() {
  $( ".playersout" ).sortable({
	  items:".dragableplayer",
	  handle:".spot",
	  connectWith: ".dragpossible",
	  start:function(event,ui) {$("#field").addClass('clearview');ui.item.addClass('moving');},
	  stop:function(event,ui) {$("#field").removeClass('clearview');ui.item.removeClass('moving');}
	  });

	$( ".dragpossible").sortable({
	  handle:".spot", connectWith:".dragpossible",
	  items:".dragableplayer",
	  start:function(event,ui) {$("#field").addClass('clearview');ui.item.addClass('moving');ui.item.closest(".alreadytaken").addClass('dragpossible');ui.item.closest(".alreadytaken").removeClass('alreadytaken');},
	  stop:function(event,ui) {$("#field").removeClass('clearview');ui.item.removeClass('moving');if (ui.item.closest(".dragpossible").hasClass('trash')) {} else {ui.item.closest(".dragpossible").addClass('alreadytaken');ui.item.closest(".dragpossible").removeClass('dragpossible');}},
	  update:function(event,ui) {if (ui.item.closest(".dragpossible").hasClass('trash')) {ui.item.children('.crp').val('tactical_');} else {if(ui.item.closest(".dragpossible").attr("id")) ui.item.children('.crp').val(ui.item.closest(".dragpossible").attr("id"));ui.item.closest(".dragpossible").addClass('alreadytaken');ui.item.closest(".dragpossible").removeClass('dragpossible');}check11();}
	  });

    }

function pushcommand(form,message)
	{
	var nocache = new Date().getTime();
	var pay=$('input[name=paymentmode]:checked').val();

	if (pay==null) alert(message);
	else
		{
		form.submit();
		}
	}

$('ul li.has-children').on("touchstart", function (e) {
'use strict'; //satisfy code inspectors
var link = $(this); //preselect the link
if (link.hasClass('hover')) {
    return true;
 }
else {
   link.addClass('hover');
   $('ul > li').not(this).removeClass('hover');
   e.preventDefault();
   return false; //extra, and to make sure the function has consistent return points
  }
});

/* p.u.b.l.i.c.i.t.e */

// // navbar sticky
// window.onscroll = function() {myFunction()};

// var navbar = document.getElementById("navbar");
// var sticky = navbar.offsetTop;

// function myFunction() {
//   if (window.pageYOffset >= sticky) {
//     navbar.classList.add("sticky")
//   } else {
//     navbar.classList.remove("sticky");
//   }
// }


/* Obfuscation social media */
var redirectToSocialLink = function(event) {
 var attribute = this.getAttribute("data-int");
 window.open(decodeURIComponent(window.atob(attribute)),'_blank');
 };

document.addEventListener("DOMContentLoaded", function(event) {
	 var classname = document.querySelectorAll(".socialMedia a");
	 for (var i = 0; i < classname.length; i++) {
	 classname[i].addEventListener('click', redirectToSocialLink, false);
	 }
})


