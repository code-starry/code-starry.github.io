!(function (f) {
     try {
          f();
     } catch (e) {
          alert(e);
     }
})(async function () {
     const root = {
          /**
           * 获取全部玩家cfg
           *
           * @return {Promise<array>}
           */
          async getAllUser() {
               return await fetch("../user.json").then((v) => {
                    return v.json();
               });
          },
          /**
           * 获取某个玩家cfg
           *
           * @return {Promise<object>}
           */
          async getUser(i) {
               return (await this.getAllUser())[i];
          },
          /**
           * 获取bg数据
           *
           * @return {Promise<object>}
           */
          async getBgData() {
               return await fetch("../bg.json").then((v) => {
                    return v.json();
               });
          },
     };
     const $ = mdui.$;
     $(`<link rel="stylesheet" type="text/css" href="../user.css">`).appendTo(
          document.body
     );
     window.addEventListener("load", function () {
          $(".mdui-tab-active")[0].classList.remove("mdui-tab-active");
     });
     const l = location.pathname.replace(/\/user\/|\/|index.html/g, "");
     const userData = await root.getUser(l);
     const bgData = await root.getBgData();
     const html = `<div id="app">
     <div class="app-top">
         <div class="app-top-left">
             <div class="app-top-left-left">
                 <div class="app-top-left-left-img">
                     <img src="${userData.avater}" draggable="false">
                 </div>
             </div>
             <div class="app-top-left-right">
                 <div class="app-top-left-right-top">
                     <div class="app-top-left-right-top-left">
                         <b>${userData.name}</b>
                     </div>
                     <div class="app-top-left-right-top-right">
                         <div class="app-top-left-right-top-right-level">1086</div>
                     </div>
                 </div>
                 <div class="app-top-left-right-bottom">
                     <p>${userData.description}</p>
                 </div>
             </div>
         </div>
     </div>
     <div class="app-bottom">
         <div class="app-bottom-left">
             <div class="app-bottom-left-title">
                 <h2>荣誉墙</h2>
             </div>
             <div class="app-bottom-left-honor">
                 <div class="app-bottom-left-honor-div">
                     <div class="app-bottom-left-honor-div-left">
                         <div class="app-bottom-left-honor-div-left-icon">
                             <img src="${bgData.honorWall.icons.view}" draggable="false">
                         </div>
                     </div>
                     <div class="app-bottom-left-honor-div-right">
                         <div class="app-bottom-left-honor-div-right-content">${
                              userData.honorWall.view
                         }</div>
                         <div class="app-bottom-left-honor-div-right-title">被浏览</div>
                     </div>
                 </div>
                 <div class="app-bottom-left-honor-div">
                     <div class="app-bottom-left-honor-div-left">
                         <div class="app-bottom-left-honor-div-left-icon">
                             <img src="${bgData.honorWall.icons.like}" draggable="false">
                         </div>
                     </div>
                     <div class="app-bottom-left-honor-div-right">
                         <div class="app-bottom-left-honor-div-right-content">${
                              userData.honorWall.like
                         }</div>
                         <div class="app-bottom-left-honor-div-right-title">被点赞</div>
                     </div>
                 </div>
                 <div class="app-bottom-left-honor-div">
                     <div class="app-bottom-left-honor-div-left">
                         <div class="app-bottom-left-honor-div-left-icon">
                             <img src="${bgData.honorWall.icons.star}" draggable="false">
                         </div>
                     </div>
                     <div class="app-bottom-left-honor-div-right">
                         <div class="app-bottom-left-honor-div-right-content">${
                              userData.honorWall.star
                         }</div>
                         <div class="app-bottom-left-honor-div-right-title">被收藏</div>
                     </div>
                 </div>
                 <div class="app-bottom-left-honor-div">
                     <div class="app-bottom-left-honor-div-left">
                         <div class="app-bottom-left-honor-div-left-icon">
                             <img src="${bgData.honorWall.icons.recreate}" draggable="false">
                         </div>
                     </div>
                     <div class="app-bottom-left-honor-div-right">
                         <div class="app-bottom-left-honor-div-right-content">${
                              userData.honorWall.recreate
                         }</div>
                         <div class="app-bottom-left-honor-div-right-title">被再创作</div>
                     </div>
                 </div>
             </div>
             <div class="app-bottom-left-coin">
                 <div class="app-bottom-left-coin-icon">
                     <img src="${bgData.coin.icon}" draggable="false">
                 </div>
                 <div class="app-bottom-left-coin-text">${userData.coin}</div>
             </div>
             <div class="app-bottom-left-updatetime">
                 <div class="app-bottom-left-updatetime-left">更新时间：</div>
                 <div class="app-bottom-left-updatetime-right">${new Date(
                      userData.honorWall.updatetime + 8 * 60 * 60 * 1000
                 ).toJSON().split("T")[0].split("-").join("/")}</div>
             </div>
         </div>
         <div class="app-bottom-right">
             <div class="app-bottom-right-div">
                 <div class="app-bottom-right-div-title">
                     <h2>勋章</h2>
                 </div>
                 <div class="app-bottom-right-div-more">
                     <button>更多勋章</button>
                 </div>
                 <div class="app-bottom-right-div-table">
                 ${userData.badge.map((v) => {
                      const s = bgData.badge.find((w) => w.name == v);
                      return `<div class="app-bottom-right-div-table-div" class="badge-${v}">
                    <div class="app-bottom-right-div-table-div-icon">
                        <img src="${s.icon}" draggable="false">
                    </div>
                    <div class="app-bottom-right-div-table-div-text">${v}</div>
                </div>`;
                 })}
                     
                 </div>
             </div>
             <div class="app-bottom-right-div app-bottom-right-certificate">
                 <div class="app-bottom-right-div-title">
                     <h2>奖状</h2>
                 </div>
                 <div class="app-bottom-right-div-more">
                     <button>更多奖状</button>
                 </div>
                 <div class="app-bottom-right-div-table">
                 ${userData.certificate.map((v) => {
                      const s = bgData.certificate.find((w) => w.name == v);
                      return `<div class="app-bottom-right-div-table-div" style="background-image: url(${s.bg});" class="certificate-${v}"></div>`;
                 })}
                 </div>
             </div>
         </div>
     </div>
 </div>`;

$(".app-bottom-right-certificate .app-bottom-right-div-table-div").each((_,e)=>{

})

     $(html).appendTo(document.body);
     !(function () {
          mdui.$(`<div id="wp" class="wp">
          <div class="xnkl">
              <div class="deng-box3">
                  <div class="deng">
                      <div class="xian"></div>
                      <div class="deng-a">
                          <div class="deng-b">
                              <div class="deng-t">新</div>
                          </div>
                      </div>
                      <div class="shui shui-a">
                          <div class="shui-c"></div>
                          <div class="shui-b"></div>
                      </div>
                  </div>
              </div>
              <div class="deng-box2">
                  <div class="deng">
                      <div class="xian"></div>
                      <div class="deng-a">
                          <div class="deng-b">
                              <div class="deng-t">年</div>
                          </div>
                      </div>
                      <div class="shui shui-a">
                          <div class="shui-c"></div>
                          <div class="shui-b"></div>
                      </div>
                  </div>
              </div>
              <div class="deng-box">
                  <div class="deng">
                      <div class="xian"></div>
                      <div class="deng-a">
                          <div class="deng-b">
                              <div class="deng-t">快</div>
                          </div>
                      </div>
                      <div class="shui shui-a">
                          <div class="shui-c"></div>
                          <div class="shui-b"></div>
                      </div>
                  </div>
              </div>
              <div class="deng-box1">
                  <div class="deng">
                      <div class="xian"></div>
                      <div class="deng-a">
                          <div class="deng-b">
                              <div class="deng-t">乐</div>
                          </div>
                      </div>
                      <div class="shui shui-a">
                          <div class="shui-c"></div>
                          <div class="shui-b"></div>
                      </div>
                  </div>
              </div>
      
          </div>
      
      `).appendTo(document.body);
          mdui.$(`<link rel="stylesheet" href="../../static/lantern.css" />`).appendTo(document.head);
      })();
      

});
