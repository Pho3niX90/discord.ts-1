"use strict";(self.webpackChunkdocusaurus=self.webpackChunkdocusaurus||[]).push([[8197],{3905:function(e,t,n){n.d(t,{Zo:function(){return l},kt:function(){return d}});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var i=r.createContext({}),p=function(e){var t=r.useContext(i),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},l=function(e){var t=p(e.components);return r.createElement(i.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},f=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,i=e.parentName,l=c(e,["components","mdxType","originalType","parentName"]),f=p(n),d=a,g=f["".concat(i,".").concat(d)]||f[d]||u[d]||o;return n?r.createElement(g,s(s({ref:t},l),{},{components:n})):r.createElement(g,s({ref:t},l))}));function d(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,s=new Array(o);s[0]=f;var c={};for(var i in t)hasOwnProperty.call(t,i)&&(c[i]=t[i]);c.originalType=e,c.mdxType="string"==typeof e?e:a,s[1]=c;for(var p=2;p<o;p++)s[p]=n[p];return r.createElement.apply(null,s)}return r.createElement.apply(null,n)}f.displayName="MDXCreateElement"},8310:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return c},contentTitle:function(){return i},metadata:function(){return p},toc:function(){return l},default:function(){return f}});var r=n(7462),a=n(3366),o=(n(7294),n(3905)),s=["components"],c={},i="ArgsOf",p={unversionedId:"general/argsof",id:"general/argsof",isDocsHomePage:!1,title:"ArgsOf",description:"ArgsOf type your events payload as an array, just pass an event (as string) in the type parameter and it types your array with the related event's parameters",source:"@site/docs/general/argsof.md",sourceDirName:"general",slug:"/general/argsof",permalink:"/docs/general/argsof",editUrl:"https://github.com/oceanroleplay/discord.ts/edit/main/docs/docs/general/argsof.md",tags:[],version:"current",lastUpdatedBy:"oceanroleplay",lastUpdatedAt:1638955963,formattedLastUpdatedAt:"12/8/2021",frontMatter:{},sidebar:"docSidebar",previous:{title:"@SelectMenuComponent",permalink:"/docs/decorators/gui/selectmenucomponent"},next:{title:"Client",permalink:"/docs/general/client"}},l=[],u={toc:l};function f(e){var t=e.components,n=(0,a.Z)(e,s);return(0,o.kt)("wrapper",(0,r.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"argsof"},"ArgsOf"),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"ArgsOf")," type your events payload as an array, just pass an event (as string) in the type parameter and it types your array with the related event's parameters"),(0,o.kt)("p",null,"You can get the list of the events and the payload type in the ",(0,o.kt)("a",{parentName:"p",href:"/docs/general/events"},'"List of events" section')),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},'import { Discord, On, Client, ArgsOf } from "discordx";\n\n@Discord()\nabstract class AppDiscord {\n  @On("messageCreate")\n  private onMessage(\n    // The type of message is Message\n    [message]: ArgsOf<"messageCreate">\n  ) {\n    // ...\n  }\n\n  @On("channelUpdate")\n  private onMessage(\n    // The type of channel1 and channel2 is TextChannel\n    [channel1, channel2]: ArgsOf<"channelUpdate">\n  ) {\n    // ...\n  }\n}\n')))}f.isMDXComponent=!0}}]);