(this["webpackJsonpmy-react-games"]=this["webpackJsonpmy-react-games"]||[]).push([[0],[,,,,,,,,function(e,t,a){e.exports=a(21)},,,,,function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),i=a(7),s=a.n(i),o=(a(13),a(1)),c=a(2),l=a(4),u=a(3),h=(a(14),a(5)),m=(a(15),a(16),function(e){Object(l.a)(a,e);var t=Object(u.a)(a);function a(){var e;Object(o.a)(this,a);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(e=t.call.apply(t,[this].concat(r))).classBuilder=function(t){return e.props.paired?"tile bright ".concat(t,"-paired"):e.props.slide?"tile slider ".concat(t):"tile ".concat(t)},e}return Object(c.a)(a,[{key:"render",value:function(){return r.a.createElement("button",{className:this.classBuilder(this.props.value),onClick:this.props.myClick})}}]),a}(n.Component)),d=function(e){Object(l.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(o.a)(this,a),(n=t.call(this,e)).state={board:n.createBoard(),gotMatches:!1,score:0,firstPick:null,secondPick:null},n}return Object(c.a)(a,[{key:"componentDidMount",value:function(){this.findMatches()}},{key:"randGem",value:function(){var e=this.props.gems;return e[Math.floor(Math.random()*e.length)]}},{key:"createBoard",value:function(){for(var e=[],t=0;t<this.props.nCols;t++){for(var a=[],n=0;n<this.props.nRows;n++){var r={};r.val=this.randGem(),r.x=t,r.y=n,r.paired=!1,r.slide=!1,a.push(r)}e.push(a)}return e}},{key:"renderBoard",value:function(){var e=this;return this.state.board.map((function(t,a){var n=t.map((function(t,n){var i="".concat(a,"-").concat(n);return r.a.createElement(m,{key:i,value:t.val,x:a,y:n,paired:t.paired,slide:t.slide,myClick:function(){return e.gemClick(t,i)}})}));return r.a.createElement("div",{className:"board-col",key:a},n)}))}},{key:"cloneFactory",value:function(){return this.state.board.map((function(e){return e.map((function(e){return Object(h.a)({},e)}))}))}},{key:"checkEvery",value:function(e){var t=e[0].val;return e.every((function(e){return e.val===t}))}},{key:"findMatches",value:function(){for(var e=this,t=this.state,a=t.firstPick,n=t.secondPick,r=this.cloneFactory(),i=0;i<r.length;i++)for(var s=0;s<r[i].length;s++){var o=r[i][s];if(i<r.length-2){var c=[o,r[i+1][s],r[i+2][s]];this.checkEvery(c)&&(this.setState({gotMatches:!0}),c.forEach((function(e){r[e.x][e.y].paired=!0})))}if(s<r[i].length-2){var l=[o,r[i][s+1],r[i][s+2]];this.checkEvery(l)&&(this.setState({gotMatches:!0}),l.forEach((function(e){r[e.x][e.y].paired=!0})))}}this.setState({board:r}),setTimeout((function(){e.state.gotMatches?e.removeMatches():a&&n&&(r[a.x][a.y].val=a.val,r[n.x][n.y].val=n.val,setTimeout((function(){e.setState({firstPick:null,secondPick:null,board:r})}),500))}),500)}},{key:"removeMatches",value:function(){var e=this,t=this.state.score,a=this.cloneFactory();a.forEach((function(e){e.forEach((function(e){e.paired&&(t+=10)}))})),setTimeout((function(){var n=a.map((function(t,a){for(var n=t.map((function(e){return e.paired})).lastIndexOf(!0),r=t.map((function(e,t){var a=Object(h.a)({},e);return-1!==n&&t<n&&(a.slide=!0),a})).filter((function(e){return!1===e.paired}));r.length<t.length;){var i={};i.x=a,i.val=e.randGem(),i.paired=!1,i.slide=!0,r.unshift(i)}return r.map((function(e,t){var a=Object(h.a)({},e);return a.y=t,a}))}));e.setState({gotMatches:!1}),e.setState({board:n,score:t,firstPick:null,secondPick:null}),e.removeSliders()}),1e3)}},{key:"removeSliders",value:function(){var e=this;console.log("removeSliders()");var t=this.cloneFactory().map((function(e){return e.map((function(e){var t=Object(h.a)({},e);return t.slide=!1,t}))}));setTimeout((function(){e.setState({board:t}),e.findMatches()}),1e3)}},{key:"getPermission",value:function(e){var t=this.state.firstPick;if(t.x===e.x){if(t.y===e.y-1||t.y===e.y+1)return!0}else{if(t.y!==e.y)return!1;if(t.x===e.x+1||t.x===e.x-1)return!0}}},{key:"gemClick",value:function(e){var t=this,a=this.state,n=a.firstPick,r=a.secondPick;if(n){if(n&&r)return void console.log("Can't pick more than 2 gems");if(this.getPermission(e)){if(this.getPermission(e)){console.log("permitted match"),setTimeout((function(){document.activeElement.blur()}),500);var i=this.state.board.map((function(e){return e.map((function(e){return Object(h.a)({},e)}))}));i[n.x][n.y].val=e.val,i[e.x][e.y].val=n.val,this.setState({board:i,secondPick:e}),setTimeout((function(){console.log("FirstPick value: ".concat(n.val)),console.log("SecondPick value: ".concat(e.val)),t.findMatches()}),500)}}else console.log("forbidden match"),this.setState({firstPick:null}),setTimeout((function(){document.activeElement.blur()}),500)}else this.setState({firstPick:e})}},{key:"restart",value:function(){var e=this;console.log("restarting game..."),this.setState({board:this.createBoard(),score:0}),setTimeout((function(){e.findMatches(),document.activeElement.blur()}),500)}},{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"board-container"},r.a.createElement("div",{className:"board-title"},r.a.createElement("h1",{className:"title"},"Gothic Match-3"),r.a.createElement("h3",{className:"score"},"Score: ",this.state.score),r.a.createElement("button",{className:"restart",onClick:function(){e.restart()}},"Restart Game")),r.a.createElement("div",{className:"board-game"},this.renderBoard()))}}]),a}(n.Component);d.defaultProps={nRows:8,nCols:8,gems:["ankh2","bat","coffin","eye","emerald","skull","moon2","goblet"]};var f=d,v=(a(17),a(18),function(e){Object(l.a)(a,e);var t=Object(u.a)(a);function a(){var e;Object(o.a)(this,a);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(e=t.call.apply(t,[this].concat(r))).classBuilder=function(e){return e.paired?"default-button rune-tile paired ".concat(e.name,"-paired"):"default-button rune-tile unpaired ".concat(e.name)},e.spanText=function(t){return t.paired||e.props.showHint?t.name:""},e}return Object(c.a)(a,[{key:"render",value:function(){var e=this;return r.a.createElement("div",null,r.a.createElement("button",{onClick:function(){e.props.onClick()},className:this.classBuilder(this.props.runeObj)},r.a.createElement("span",{className:"rune-name-span"},this.spanText(this.props.runeObj))))}}]),a}(n.Component)),p=function(e){Object(l.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(o.a)(this,a),(n=t.call(this,e)).state={wonGame:!1,startedGame:!1,showHint:!1,question:"",answer:"",message:"Click the start button to begin",runes:[]},n}return Object(c.a)(a,[{key:"menuClick",value:function(e){var t=this,a=this.state,n=a.question,r=a.runes;console.log("Clicked on ".concat(e)),this.setState({answer:e});var i=e.toUpperCase();if(n===e){console.log("Matched ".concat(n," and ").concat(e)),this.setState({message:"That's right! This is the rune ".concat(i)});var s=r.map((function(t){return t.name===e?Object(h.a)(Object(h.a)({},t),{},{paired:!0}):t}));this.setState({runes:s}),setTimeout((function(){console.log("Timeout reached, clearing answer + getting new question"),t.setState({answer:"",message:""}),t.newQuest()}),3e3)}else this.setState({message:"Wrong, this is the rune ".concat(i)}),setTimeout((function(){console.log("Timeout reached, clearing answer"),t.setState({answer:"",message:""})}),3e3)}},{key:"buildMenu",value:function(){var e=this;return this.state.startedGame?this.state.runes.map((function(t,a){return r.a.createElement(v,{key:a,runeObj:t,onClick:function(){e.menuClick(t.name)},showHint:e.state.showHint})})):null}},{key:"onStart",value:function(){var e=this.props.runeNames;this.setState({startedGame:!0});var t=e.map((function(e){var t={};return t.name=e,t.paired=!1,t}));console.log(t);var a=t[Math.floor(Math.random()*t.length)].name;this.setState({question:a,message:"",runes:t})}},{key:"newQuest",value:function(){var e=this.state.runes.filter((function(e){return!1===e.paired}));if(console.log(e),0===e.length)this.setState({message:"Congrats, you've named all the runes!",wonGame:!0,startedGame:!1});else{var t=e[Math.floor(Math.random()*e.length)].name;this.setState({question:t})}}},{key:"showHint",value:function(){var e=this;this.setState({showHint:!0}),console.log("Showing hints"),setTimeout((function(){e.setState({showHint:!1}),console.log("Hiding hints")}),5e3)}},{key:"render",value:function(){var e=this,t=this.state,a=t.question,n=t.message,i=t.startedGame,s=t.wonGame,o=a.toUpperCase();return r.a.createElement("div",{className:"container"},r.a.createElement("h1",{className:"title"},"Rune Flashcards"),r.a.createElement("div",{className:"question-box"},r.a.createElement("h2",{className:"message"},0!==n.length?n:"Find this rune: ".concat(o))),i?r.a.createElement("div",{className:"rune-box"},this.buildMenu()):null,i?null:r.a.createElement("button",{onClick:function(){e.onStart()},className:"start-button default-button"},s?"Replay":"Start"),i?r.a.createElement("button",{className:"start-button default-button",onClick:function(){e.showHint()}},"Show Rune Names"):null)}}]),a}(n.Component);p.defaultProps={runeNames:["fehu","uruz","thurisaz","ansuz","raidho","kaunaz","gebo","wunju","hagalaz","naudiz","isa","jara","eihwaz","perthu","algiz","sowulo","teiwaz","berkana","ehwaz","mannaz","laguz","ingwaz","dagaz","othala"]};var b=p,g=(a(19),a(20),function(e){Object(l.a)(a,e);var t=Object(u.a)(a);function a(){var e;Object(o.a)(this,a);for(var n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(e=t.call.apply(t,[this].concat(r))).classBuilder=function(e){return"hide"===e.reveal?"Tile-button hilight bg":"paired"===e.reveal?"Tile-button ".concat(e.img,"-fade"):"show"===e.reveal?"Tile-button hilight ".concat(e.img):void 0},e}return Object(c.a)(a,[{key:"render",value:function(){var e=this,t=this.props.tileObj;return r.a.createElement("div",{className:"Tile"},t?r.a.createElement("button",{className:this.classBuilder(t),onClick:function(){e.props.onClick()}}):r.a.createElement("button",{className:"Tile-button bg-fade"}))}}]),a}(n.Component)),k=function(e){Object(l.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(o.a)(this,a),(n=t.call(this,e)).state={tiles:Array(16).fill(null),startGame:!1,firstPick:null,secondPick:null},n}return Object(c.a)(a,[{key:"handleClick",value:function(e){var t=this,a=this.state,n=a.firstPick,r=a.secondPick,i=a.tiles,s=i[e];if("hide"===s.reveal&&(!n||!r))if(n)if(n.img===s.img){console.log("".concat(n.img," and ").concat(s.img," -- yay, a match!"));var o=i.map((function(e){return e.img===s.img?Object(h.a)(Object(h.a)({},e),{},{reveal:"paired"}):e}));this.setState({firstPick:null,tiles:o})}else console.log("".concat(n.img," and ").concat(s.img," -- no match :(")),s.reveal="show",this.setState({secondPick:s}),setTimeout((function(){var e=i.map((function(e){return"show"===e.reveal?Object(h.a)(Object(h.a)({},e),{},{reveal:"hide"}):e}));t.setState({firstPick:null,secondPick:null,tiles:e}),console.log("timer up!")}),1500);else s.reveal="show",this.setState({firstPick:s})}},{key:"startGame",value:function(){this.setState({startGame:!0});for(var e=[],t=0;e.length<this.state.tiles.length&&t<this.props.choices.length;){var a=this.props.choices[t];e.push(a,a),t++}console.log("Exited loop: ",e);for(var n=e.length-1;n>0;n--){var r=Math.floor(Math.random()*(n+1)),i=[e[r],e[n]];e[n]=i[0],e[r]=i[1]}console.log("Scrambled newArr: ",e);var s=e.map((function(e){var t={};return t.img=e,t.reveal="hide",t}));console.log(s),this.setState({tiles:s})}},{key:"renderTile",value:function(e){var t=this;return r.a.createElement(g,{tileObj:this.state.tiles[e],onClick:function(){t.handleClick(e)}})}},{key:"onStart",value:function(){var e=!1;return this.state.tiles[0]&&(e=this.state.tiles.every((function(e){return"paired"===e.reveal}))),this.state.startGame?e?(console.log("Winner is true"),"Board-start-visible"):"Board-start":"Board-start-visible"}},{key:"render",value:function(){var e=this,t=!1;return this.state.tiles[0]&&(t=this.state.tiles.every((function(e){return"paired"===e.reveal})),console.log("Winner is ".concat(t))),r.a.createElement("div",{className:"Board"},r.a.createElement("h1",{className:"Board-title"},"Vampire Memory"),r.a.createElement("div",{className:"Board-row"},this.renderTile(0),this.renderTile(1),this.renderTile(2),this.renderTile(3)),r.a.createElement("div",{className:"Board-row"},this.renderTile(4),this.renderTile(5),this.renderTile(6),this.renderTile(7)),r.a.createElement("div",{className:"Board-row"},this.renderTile(8),this.renderTile(9),this.renderTile(10),this.renderTile(11)),r.a.createElement("div",{className:"Board-row"},this.renderTile(12),this.renderTile(13),this.renderTile(14),this.renderTile(15)),r.a.createElement("div",{className:this.onStart()},t?r.a.createElement("h1",null,"You Win! Play again?"):null,r.a.createElement("button",{className:"Board-start-button",onClick:function(){return e.startGame()}},"Start Game")))}}]),a}(n.Component);k.defaultProps={choices:["fangs2","ankh","moon","blood","castle","candles2","cup","bats"]};var y=k,E=function(e){Object(l.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(o.a)(this,a),(n=t.call(this,e)).state={currentGame:"default"},n}return Object(c.a)(a,[{key:"clickHandler",value:function(e){this.setState({currentGame:e})}},{key:"render",value:function(){var e=this;return r.a.createElement("div",null,r.a.createElement("div",{className:"default"===this.state.currentGame?"nav-full":"nav-menu"},r.a.createElement("h1",null,"my React games"),r.a.createElement("div",{className:"nav-box"},r.a.createElement("button",{className:"nav-button match-button",onClick:function(){e.clickHandler("goth")}},"Gothic Match-3"),r.a.createElement("button",{className:"nav-button vamp-button",onClick:function(){e.clickHandler("vamp")}},"Vampire Memory"),r.a.createElement("button",{className:"nav-button rune-button",onClick:function(){e.clickHandler("rune")}},"Rune Flashcards"),r.a.createElement("a",{href:"https://sammael001.github.io/new-public-portfolio/"},r.a.createElement("button",{className:"nav-button portfolio"},"Back to Portfolio")))),r.a.createElement("div",{className:"game-container"},"goth"===this.state.currentGame?r.a.createElement(f,null):null,"vamp"===this.state.currentGame?r.a.createElement(y,null):null,"rune"===this.state.currentGame?r.a.createElement(b,null):null))}}]),a}(n.Component);s.a.render(r.a.createElement(E,null),document.getElementById("root"))}],[[8,1,2]]]);
//# sourceMappingURL=main.3b6c49a4.chunk.js.map