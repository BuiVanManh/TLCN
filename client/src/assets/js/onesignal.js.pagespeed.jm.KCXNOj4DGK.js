var OneSignal=window.OneSignal||[];var lang=LOCALE==='en'?{'tip.state.unsubscribed':'Subscribe to notifications','tip.state.subscribed':"You're subscribed to notifications",'tip.state.blocked':"You've blocked notifications",'message.prenotify':'Click to subscribe to notifications','message.action.subscribed':"Thanks for subscribing!",'message.action.resubscribed':"You're subscribed to notifications",'message.action.unsubscribed':"You won't receive notifications again",'dialog.main.title':'Manage Site Notifications','dialog.main.button.subscribe':'SUBSCRIBE','dialog.main.button.unsubscribe':'UNSUBSCRIBE','dialog.blocked.title':'Unblock Notifications','dialog.blocked.message':"Follow these instructions to allow notifications:"}:{'tip.state.unsubscribed':'Подписаться на уведомления','tip.state.subscribed':"Вы подписались на уведомления",'tip.state.blocked':"Вы заблокировали уведомления",'message.prenotify':'Нажмите для подписки на уведомления','message.action.subscribed':"Спасибо за подписку!",'message.action.resubscribed':"Вы подписаны на уведомления",'message.action.unsubscribed':"Вы больше не будете получать уведодомления",'dialog.main.title':'Управлять уведомеления сайтом','dialog.main.button.subscribe':'ПОДПИСАТЬСЯ','dialog.main.button.unsubscribe':'ОТПИСАТЬСЯ','dialog.blocked.title':'Разблокировать уведомления','dialog.blocked.message':"Выполните эти инструкции для получения уведомлений:"};OneSignal.push(["init",{appId:"45b292f6-04ca-474e-bbfa-5e055557090e",autoRegister:false,notifyButton:{enable:false,displayPredicate:function(){return OneSignal.isPushNotificationsEnabled().then(function(isPushEnabled){return!isPushEnabled;});},promptOptions:{actionMessage:LOCALE==='en'?"We'd like to show you notifications for the latest news and updates.":"Мы бы хотели вам показывать оповещения о последних новостях и обновлениях",acceptButtonText:LOCALE==='en'?"ALLOW":"Разрешить",cancelButtonText:LOCALE==='en'?"NO THANKS":"Нет, спасибо"},size:'medium',theme:'default',position:'bottom-right',offset:{bottom:'10px',left:'0px',right:'10px'},prenotify:true,showCredit:false,allowLocalhostAsSecureOrigin:true,text:lang}}]);