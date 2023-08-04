(()=>{var e={5265:function(e,t,r){"use strict"
var n=this&&this.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r),Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[r]}})}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),s=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),o=this&&this.__importStar||function(e){if(e&&e.__esModule)return e
var t={}
if(null!=e)for(var r in e)"default"!==r&&Object.hasOwnProperty.call(e,r)&&n(t,e,r)
return s(t,e),t}
Object.defineProperty(t,"__esModule",{value:!0}),t.issue=t.issueCommand=void 0
const i=o(r(2037)),a=r(4570)
function c(e,t,r){const n=new u(e,t,r)
process.stdout.write(n.toString()+i.EOL)}t.issueCommand=c,t.issue=function(e,t=""){c(e,{},t)}
class u{constructor(e,t,r){e||(e="missing.command"),this.command=e,this.properties=t,this.message=r}toString(){let e="::"+this.command
if(this.properties&&Object.keys(this.properties).length>0){e+=" "
let r=!0
for(const n in this.properties)if(this.properties.hasOwnProperty(n)){const s=this.properties[n]
s&&(r?r=!1:e+=",",e+=`${n}=${t=s,a.toCommandValue(t).replace(/%/g,"%25").replace(/\r/g,"%0D").replace(/\n/g,"%0A").replace(/:/g,"%3A").replace(/,/g,"%2C")}`)}}var t
return e+=`::${function(e){return a.toCommandValue(e).replace(/%/g,"%25").replace(/\r/g,"%0D").replace(/\n/g,"%0A")}(this.message)}`,e}}},2225:function(e,t,r){"use strict"
var n=this&&this.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r),Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[r]}})}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),s=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),o=this&&this.__importStar||function(e){if(e&&e.__esModule)return e
var t={}
if(null!=e)for(var r in e)"default"!==r&&Object.hasOwnProperty.call(e,r)&&n(t,e,r)
return s(t,e),t},i=this&&this.__awaiter||function(e,t,r,n){return new(r||(r=Promise))((function(s,o){function i(e){try{c(n.next(e))}catch(e){o(e)}}function a(e){try{c(n.throw(e))}catch(e){o(e)}}function c(e){var t
e.done?s(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(i,a)}c((n=n.apply(e,t||[])).next())}))}
Object.defineProperty(t,"__esModule",{value:!0}),t.getIDToken=t.getState=t.saveState=t.group=t.endGroup=t.startGroup=t.info=t.notice=t.warning=t.error=t.debug=t.isDebug=t.setFailed=t.setCommandEcho=t.setOutput=t.getBooleanInput=t.getMultilineInput=t.getInput=t.addPath=t.setSecret=t.exportVariable=t.ExitCode=void 0
const a=r(5265),c=r(3108),u=r(4570),l=o(r(2037)),d=o(r(1017)),f=r(1526)
var h
function p(e,t){const r=process.env[`INPUT_${e.replace(/ /g,"_").toUpperCase()}`]||""
if(t&&t.required&&!r)throw new Error(`Input required and not supplied: ${e}`)
return t&&!1===t.trimWhitespace?r:r.trim()}function m(e,t={}){a.issueCommand("error",u.toCommandProperties(t),e instanceof Error?e.toString():e)}function g(e){a.issue("group",e)}function v(){a.issue("endgroup")}!function(e){e[e.Success=0]="Success",e[e.Failure=1]="Failure"}(h=t.ExitCode||(t.ExitCode={})),t.exportVariable=function(e,t){const r=u.toCommandValue(t)
if(process.env[e]=r,process.env.GITHUB_ENV||"")return c.issueFileCommand("ENV",c.prepareKeyValueMessage(e,t))
a.issueCommand("set-env",{name:e},r)},t.setSecret=function(e){a.issueCommand("add-mask",{},e)},t.addPath=function(e){process.env.GITHUB_PATH||""?c.issueFileCommand("PATH",e):a.issueCommand("add-path",{},e),process.env.PATH=`${e}${d.delimiter}${process.env.PATH}`},t.getInput=p,t.getMultilineInput=function(e,t){const r=p(e,t).split("\n").filter((e=>""!==e))
return t&&!1===t.trimWhitespace?r:r.map((e=>e.trim()))},t.getBooleanInput=function(e,t){const r=p(e,t)
if(["true","True","TRUE"].includes(r))return!0
if(["false","False","FALSE"].includes(r))return!1
throw new TypeError(`Input does not meet YAML 1.2 "Core Schema" specification: ${e}\nSupport boolean input list: \`true | True | TRUE | false | False | FALSE\``)},t.setOutput=function(e,t){if(process.env.GITHUB_OUTPUT||"")return c.issueFileCommand("OUTPUT",c.prepareKeyValueMessage(e,t))
process.stdout.write(l.EOL),a.issueCommand("set-output",{name:e},u.toCommandValue(t))},t.setCommandEcho=function(e){a.issue("echo",e?"on":"off")},t.setFailed=function(e){process.exitCode=h.Failure,m(e)},t.isDebug=function(){return"1"===process.env.RUNNER_DEBUG},t.debug=function(e){a.issueCommand("debug",{},e)},t.error=m,t.warning=function(e,t={}){a.issueCommand("warning",u.toCommandProperties(t),e instanceof Error?e.toString():e)},t.notice=function(e,t={}){a.issueCommand("notice",u.toCommandProperties(t),e instanceof Error?e.toString():e)},t.info=function(e){process.stdout.write(e+l.EOL)},t.startGroup=g,t.endGroup=v,t.group=function(e,t){return i(this,void 0,void 0,(function*(){let r
g(e)
try{r=yield t()}finally{v()}return r}))},t.saveState=function(e,t){if(process.env.GITHUB_STATE||"")return c.issueFileCommand("STATE",c.prepareKeyValueMessage(e,t))
a.issueCommand("save-state",{name:e},u.toCommandValue(t))},t.getState=function(e){return process.env[`STATE_${e}`]||""},t.getIDToken=function(e){return i(this,void 0,void 0,(function*(){return yield f.OidcClient.getIDToken(e)}))}
var y=r(7410)
Object.defineProperty(t,"summary",{enumerable:!0,get:function(){return y.summary}})
var w=r(7410)
Object.defineProperty(t,"markdownSummary",{enumerable:!0,get:function(){return w.markdownSummary}})
var E=r(6340)
Object.defineProperty(t,"toPosixPath",{enumerable:!0,get:function(){return E.toPosixPath}}),Object.defineProperty(t,"toWin32Path",{enumerable:!0,get:function(){return E.toWin32Path}}),Object.defineProperty(t,"toPlatformPath",{enumerable:!0,get:function(){return E.toPlatformPath}})},3108:function(e,t,r){"use strict"
var n=this&&this.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r),Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[r]}})}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),s=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),o=this&&this.__importStar||function(e){if(e&&e.__esModule)return e
var t={}
if(null!=e)for(var r in e)"default"!==r&&Object.hasOwnProperty.call(e,r)&&n(t,e,r)
return s(t,e),t}
Object.defineProperty(t,"__esModule",{value:!0}),t.prepareKeyValueMessage=t.issueFileCommand=void 0
const i=o(r(7147)),a=o(r(2037)),c=r(2277),u=r(4570)
t.issueFileCommand=function(e,t){const r=process.env[`GITHUB_${e}`]
if(!r)throw new Error(`Unable to find environment variable for file command ${e}`)
if(!i.existsSync(r))throw new Error(`Missing file at path: ${r}`)
i.appendFileSync(r,`${u.toCommandValue(t)}${a.EOL}`,{encoding:"utf8"})},t.prepareKeyValueMessage=function(e,t){const r=`ghadelimiter_${c.v4()}`,n=u.toCommandValue(t)
if(e.includes(r))throw new Error(`Unexpected input: name should not contain the delimiter "${r}"`)
if(n.includes(r))throw new Error(`Unexpected input: value should not contain the delimiter "${r}"`)
return`${e}<<${r}${a.EOL}${n}${a.EOL}${r}`}},1526:function(e,t,r){"use strict"
var n=this&&this.__awaiter||function(e,t,r,n){return new(r||(r=Promise))((function(s,o){function i(e){try{c(n.next(e))}catch(e){o(e)}}function a(e){try{c(n.throw(e))}catch(e){o(e)}}function c(e){var t
e.done?s(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(i,a)}c((n=n.apply(e,t||[])).next())}))}
Object.defineProperty(t,"__esModule",{value:!0}),t.OidcClient=void 0
const s=r(4635),o=r(2429),i=r(2225)
class a{static createHttpClient(e=!0,t=10){const r={allowRetries:e,maxRetries:t}
return new s.HttpClient("actions/oidc-client",[new o.BearerCredentialHandler(a.getRequestToken())],r)}static getRequestToken(){const e=process.env.ACTIONS_ID_TOKEN_REQUEST_TOKEN
if(!e)throw new Error("Unable to get ACTIONS_ID_TOKEN_REQUEST_TOKEN env variable")
return e}static getIDTokenUrl(){const e=process.env.ACTIONS_ID_TOKEN_REQUEST_URL
if(!e)throw new Error("Unable to get ACTIONS_ID_TOKEN_REQUEST_URL env variable")
return e}static getCall(e){var t
return n(this,void 0,void 0,(function*(){const r=a.createHttpClient(),n=yield r.getJson(e).catch((e=>{throw new Error(`Failed to get ID Token. \n \n        Error Code : ${e.statusCode}\n \n        Error Message: ${e.result.message}`)})),s=null===(t=n.result)||void 0===t?void 0:t.value
if(!s)throw new Error("Response json body do not have ID Token field")
return s}))}static getIDToken(e){return n(this,void 0,void 0,(function*(){try{let t=a.getIDTokenUrl()
if(e){t=`${t}&audience=${encodeURIComponent(e)}`}i.debug(`ID token url is ${t}`)
const r=yield a.getCall(t)
return i.setSecret(r),r}catch(e){throw new Error(`Error message: ${e.message}`)}}))}}t.OidcClient=a},6340:function(e,t,r){"use strict"
var n=this&&this.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r),Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[r]}})}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),s=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),o=this&&this.__importStar||function(e){if(e&&e.__esModule)return e
var t={}
if(null!=e)for(var r in e)"default"!==r&&Object.hasOwnProperty.call(e,r)&&n(t,e,r)
return s(t,e),t}
Object.defineProperty(t,"__esModule",{value:!0}),t.toPlatformPath=t.toWin32Path=t.toPosixPath=void 0
const i=o(r(1017))
t.toPosixPath=function(e){return e.replace(/[\\]/g,"/")},t.toWin32Path=function(e){return e.replace(/[/]/g,"\\")},t.toPlatformPath=function(e){return e.replace(/[/\\]/g,i.sep)}},7410:function(e,t,r){"use strict"
var n=this&&this.__awaiter||function(e,t,r,n){return new(r||(r=Promise))((function(s,o){function i(e){try{c(n.next(e))}catch(e){o(e)}}function a(e){try{c(n.throw(e))}catch(e){o(e)}}function c(e){var t
e.done?s(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(i,a)}c((n=n.apply(e,t||[])).next())}))}
Object.defineProperty(t,"__esModule",{value:!0}),t.summary=t.markdownSummary=t.SUMMARY_DOCS_URL=t.SUMMARY_ENV_VAR=void 0
const s=r(2037),o=r(7147),{access:i,appendFile:a,writeFile:c}=o.promises
t.SUMMARY_ENV_VAR="GITHUB_STEP_SUMMARY",t.SUMMARY_DOCS_URL="https://docs.github.com/actions/using-workflows/workflow-commands-for-github-actions#adding-a-job-summary"
const u=new class{constructor(){this._buffer=""}filePath(){return n(this,void 0,void 0,(function*(){if(this._filePath)return this._filePath
const e=process.env[t.SUMMARY_ENV_VAR]
if(!e)throw new Error(`Unable to find environment variable for $${t.SUMMARY_ENV_VAR}. Check if your runtime environment supports job summaries.`)
try{yield i(e,o.constants.R_OK|o.constants.W_OK)}catch(t){throw new Error(`Unable to access summary file: '${e}'. Check if the file has correct read/write permissions.`)}return this._filePath=e,this._filePath}))}wrap(e,t,r={}){const n=Object.entries(r).map((([e,t])=>` ${e}="${t}"`)).join("")
return t?`<${e}${n}>${t}</${e}>`:`<${e}${n}>`}write(e){return n(this,void 0,void 0,(function*(){const t=!!(null==e?void 0:e.overwrite),r=yield this.filePath(),n=t?c:a
return yield n(r,this._buffer,{encoding:"utf8"}),this.emptyBuffer()}))}clear(){return n(this,void 0,void 0,(function*(){return this.emptyBuffer().write({overwrite:!0})}))}stringify(){return this._buffer}isEmptyBuffer(){return 0===this._buffer.length}emptyBuffer(){return this._buffer="",this}addRaw(e,t=!1){return this._buffer+=e,t?this.addEOL():this}addEOL(){return this.addRaw(s.EOL)}addCodeBlock(e,t){const r=Object.assign({},t&&{lang:t}),n=this.wrap("pre",this.wrap("code",e),r)
return this.addRaw(n).addEOL()}addList(e,t=!1){const r=t?"ol":"ul",n=e.map((e=>this.wrap("li",e))).join(""),s=this.wrap(r,n)
return this.addRaw(s).addEOL()}addTable(e){const t=e.map((e=>{const t=e.map((e=>{if("string"==typeof e)return this.wrap("td",e)
const{header:t,data:r,colspan:n,rowspan:s}=e,o=t?"th":"td",i=Object.assign(Object.assign({},n&&{colspan:n}),s&&{rowspan:s})
return this.wrap(o,r,i)})).join("")
return this.wrap("tr",t)})).join(""),r=this.wrap("table",t)
return this.addRaw(r).addEOL()}addDetails(e,t){const r=this.wrap("details",this.wrap("summary",e)+t)
return this.addRaw(r).addEOL()}addImage(e,t,r){const{width:n,height:s}=r||{},o=Object.assign(Object.assign({},n&&{width:n}),s&&{height:s}),i=this.wrap("img",null,Object.assign({src:e,alt:t},o))
return this.addRaw(i).addEOL()}addHeading(e,t){const r=`h${t}`,n=["h1","h2","h3","h4","h5","h6"].includes(r)?r:"h1",s=this.wrap(n,e)
return this.addRaw(s).addEOL()}addSeparator(){const e=this.wrap("hr",null)
return this.addRaw(e).addEOL()}addBreak(){const e=this.wrap("br",null)
return this.addRaw(e).addEOL()}addQuote(e,t){const r=Object.assign({},t&&{cite:t}),n=this.wrap("blockquote",e,r)
return this.addRaw(n).addEOL()}addLink(e,t){const r=this.wrap("a",e,{href:t})
return this.addRaw(r).addEOL()}}
t.markdownSummary=u,t.summary=u},4570:(e,t)=>{"use strict"
Object.defineProperty(t,"__esModule",{value:!0}),t.toCommandProperties=t.toCommandValue=void 0,t.toCommandValue=function(e){return null==e?"":"string"==typeof e||e instanceof String?e:JSON.stringify(e)},t.toCommandProperties=function(e){return Object.keys(e).length?{title:e.title,file:e.file,line:e.startLine,endLine:e.endLine,col:e.startColumn,endColumn:e.endColumn}:{}}},27:function(e,t,r){"use strict"
var n=this&&this.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r),Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[r]}})}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),s=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),o=this&&this.__importStar||function(e){if(e&&e.__esModule)return e
var t={}
if(null!=e)for(var r in e)"default"!==r&&Object.hasOwnProperty.call(e,r)&&n(t,e,r)
return s(t,e),t},i=this&&this.__awaiter||function(e,t,r,n){return new(r||(r=Promise))((function(s,o){function i(e){try{c(n.next(e))}catch(e){o(e)}}function a(e){try{c(n.throw(e))}catch(e){o(e)}}function c(e){var t
e.done?s(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(i,a)}c((n=n.apply(e,t||[])).next())}))}
Object.defineProperty(t,"__esModule",{value:!0}),t.getExecOutput=t.exec=void 0
const a=r(1576),c=o(r(4171))
function u(e,t,r){return i(this,void 0,void 0,(function*(){const n=c.argStringToArray(e)
if(0===n.length)throw new Error("Parameter 'commandLine' cannot be null or empty.")
const s=n[0]
t=n.slice(1).concat(t||[])
return new c.ToolRunner(s,t,r).exec()}))}t.exec=u,t.getExecOutput=function(e,t,r){var n,s
return i(this,void 0,void 0,(function*(){let o="",i=""
const c=new a.StringDecoder("utf8"),l=new a.StringDecoder("utf8"),d=null===(n=null==r?void 0:r.listeners)||void 0===n?void 0:n.stdout,f=null===(s=null==r?void 0:r.listeners)||void 0===s?void 0:s.stderr,h=Object.assign(Object.assign({},null==r?void 0:r.listeners),{stdout:e=>{o+=c.write(e),d&&d(e)},stderr:e=>{i+=l.write(e),f&&f(e)}}),p=yield u(e,t,Object.assign(Object.assign({},r),{listeners:h}))
return o+=c.end(),i+=l.end(),{exitCode:p,stdout:o,stderr:i}}))}},4171:function(e,t,r){"use strict"
var n=this&&this.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r),Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[r]}})}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),s=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),o=this&&this.__importStar||function(e){if(e&&e.__esModule)return e
var t={}
if(null!=e)for(var r in e)"default"!==r&&Object.hasOwnProperty.call(e,r)&&n(t,e,r)
return s(t,e),t},i=this&&this.__awaiter||function(e,t,r,n){return new(r||(r=Promise))((function(s,o){function i(e){try{c(n.next(e))}catch(e){o(e)}}function a(e){try{c(n.throw(e))}catch(e){o(e)}}function c(e){var t
e.done?s(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(i,a)}c((n=n.apply(e,t||[])).next())}))}
Object.defineProperty(t,"__esModule",{value:!0}),t.argStringToArray=t.ToolRunner=void 0
const a=o(r(2037)),c=o(r(2361)),u=o(r(2081)),l=o(r(1017)),d=o(r(484)),f=o(r(7564)),h=r(9512),p="win32"===process.platform
class m extends c.EventEmitter{constructor(e,t,r){if(super(),!e)throw new Error("Parameter 'toolPath' cannot be null or empty.")
this.toolPath=e,this.args=t||[],this.options=r||{}}_debug(e){this.options.listeners&&this.options.listeners.debug&&this.options.listeners.debug(e)}_getCommandString(e,t){const r=this._getSpawnFileName(),n=this._getSpawnArgs(e)
let s=t?"":"[command]"
if(p)if(this._isCmdFile()){s+=r
for(const e of n)s+=` ${e}`}else if(e.windowsVerbatimArguments){s+=`"${r}"`
for(const e of n)s+=` ${e}`}else{s+=this._windowsQuoteCmdArg(r)
for(const e of n)s+=` ${this._windowsQuoteCmdArg(e)}`}else{s+=r
for(const e of n)s+=` ${e}`}return s}_processLineBuffer(e,t,r){try{let n=t+e.toString(),s=n.indexOf(a.EOL)
for(;s>-1;){r(n.substring(0,s)),n=n.substring(s+a.EOL.length),s=n.indexOf(a.EOL)}return n}catch(e){return this._debug(`error processing line. Failed with error ${e}`),""}}_getSpawnFileName(){return p&&this._isCmdFile()?process.env.COMSPEC||"cmd.exe":this.toolPath}_getSpawnArgs(e){if(p&&this._isCmdFile()){let t=`/D /S /C "${this._windowsQuoteCmdArg(this.toolPath)}`
for(const r of this.args)t+=" ",t+=e.windowsVerbatimArguments?r:this._windowsQuoteCmdArg(r)
return t+='"',[t]}return this.args}_endsWith(e,t){return e.endsWith(t)}_isCmdFile(){const e=this.toolPath.toUpperCase()
return this._endsWith(e,".CMD")||this._endsWith(e,".BAT")}_windowsQuoteCmdArg(e){if(!this._isCmdFile())return this._uvQuoteCmdArg(e)
if(!e)return'""'
const t=[" ","\t","&","(",")","[","]","{","}","^","=",";","!","'","+",",","`","~","|","<",">",'"']
let r=!1
for(const n of e)if(t.some((e=>e===n))){r=!0
break}if(!r)return e
let n='"',s=!0
for(let t=e.length;t>0;t--)n+=e[t-1],s&&"\\"===e[t-1]?n+="\\":'"'===e[t-1]?(s=!0,n+='"'):s=!1
return n+='"',n.split("").reverse().join("")}_uvQuoteCmdArg(e){if(!e)return'""'
if(!e.includes(" ")&&!e.includes("\t")&&!e.includes('"'))return e
if(!e.includes('"')&&!e.includes("\\"))return`"${e}"`
let t='"',r=!0
for(let n=e.length;n>0;n--)t+=e[n-1],r&&"\\"===e[n-1]?t+="\\":'"'===e[n-1]?(r=!0,t+="\\"):r=!1
return t+='"',t.split("").reverse().join("")}_cloneExecOptions(e){const t={cwd:(e=e||{}).cwd||process.cwd(),env:e.env||process.env,silent:e.silent||!1,windowsVerbatimArguments:e.windowsVerbatimArguments||!1,failOnStdErr:e.failOnStdErr||!1,ignoreReturnCode:e.ignoreReturnCode||!1,delay:e.delay||1e4}
return t.outStream=e.outStream||process.stdout,t.errStream=e.errStream||process.stderr,t}_getSpawnOptions(e,t){e=e||{}
const r={}
return r.cwd=e.cwd,r.env=e.env,r.windowsVerbatimArguments=e.windowsVerbatimArguments||this._isCmdFile(),e.windowsVerbatimArguments&&(r.argv0=`"${t}"`),r}exec(){return i(this,void 0,void 0,(function*(){return!f.isRooted(this.toolPath)&&(this.toolPath.includes("/")||p&&this.toolPath.includes("\\"))&&(this.toolPath=l.resolve(process.cwd(),this.options.cwd||process.cwd(),this.toolPath)),this.toolPath=yield d.which(this.toolPath,!0),new Promise(((e,t)=>i(this,void 0,void 0,(function*(){this._debug(`exec tool: ${this.toolPath}`),this._debug("arguments:")
for(const e of this.args)this._debug(`   ${e}`)
const r=this._cloneExecOptions(this.options)
!r.silent&&r.outStream&&r.outStream.write(this._getCommandString(r)+a.EOL)
const n=new g(r,this.toolPath)
if(n.on("debug",(e=>{this._debug(e)})),this.options.cwd&&!(yield f.exists(this.options.cwd)))return t(new Error(`The cwd: ${this.options.cwd} does not exist!`))
const s=this._getSpawnFileName(),o=u.spawn(s,this._getSpawnArgs(r),this._getSpawnOptions(this.options,s))
let i=""
o.stdout&&o.stdout.on("data",(e=>{this.options.listeners&&this.options.listeners.stdout&&this.options.listeners.stdout(e),!r.silent&&r.outStream&&r.outStream.write(e),i=this._processLineBuffer(e,i,(e=>{this.options.listeners&&this.options.listeners.stdline&&this.options.listeners.stdline(e)}))}))
let c=""
if(o.stderr&&o.stderr.on("data",(e=>{if(n.processStderr=!0,this.options.listeners&&this.options.listeners.stderr&&this.options.listeners.stderr(e),!r.silent&&r.errStream&&r.outStream){(r.failOnStdErr?r.errStream:r.outStream).write(e)}c=this._processLineBuffer(e,c,(e=>{this.options.listeners&&this.options.listeners.errline&&this.options.listeners.errline(e)}))})),o.on("error",(e=>{n.processError=e.message,n.processExited=!0,n.processClosed=!0,n.CheckComplete()})),o.on("exit",(e=>{n.processExitCode=e,n.processExited=!0,this._debug(`Exit code ${e} received from tool '${this.toolPath}'`),n.CheckComplete()})),o.on("close",(e=>{n.processExitCode=e,n.processExited=!0,n.processClosed=!0,this._debug(`STDIO streams have closed for tool '${this.toolPath}'`),n.CheckComplete()})),n.on("done",((r,n)=>{i.length>0&&this.emit("stdline",i),c.length>0&&this.emit("errline",c),o.removeAllListeners(),r?t(r):e(n)})),this.options.input){if(!o.stdin)throw new Error("child process missing stdin")
o.stdin.end(this.options.input)}}))))}))}}t.ToolRunner=m,t.argStringToArray=function(e){const t=[]
let r=!1,n=!1,s=""
function o(e){n&&'"'!==e&&(s+="\\"),s+=e,n=!1}for(let i=0;i<e.length;i++){const a=e.charAt(i)
'"'!==a?"\\"===a&&n?o(a):"\\"===a&&r?n=!0:" "!==a||r?o(a):s.length>0&&(t.push(s),s=""):n?o(a):r=!r}return s.length>0&&t.push(s.trim()),t}
class g extends c.EventEmitter{constructor(e,t){if(super(),this.processClosed=!1,this.processError="",this.processExitCode=0,this.processExited=!1,this.processStderr=!1,this.delay=1e4,this.done=!1,this.timeout=null,!t)throw new Error("toolPath must not be empty")
this.options=e,this.toolPath=t,e.delay&&(this.delay=e.delay)}CheckComplete(){this.done||(this.processClosed?this._setResult():this.processExited&&(this.timeout=h.setTimeout(g.HandleTimeout,this.delay,this)))}_debug(e){this.emit("debug",e)}_setResult(){let e
this.processExited&&(this.processError?e=new Error(`There was an error when attempting to execute the process '${this.toolPath}'. This may indicate the process failed to start. Error: ${this.processError}`):0===this.processExitCode||this.options.ignoreReturnCode?this.processStderr&&this.options.failOnStdErr&&(e=new Error(`The process '${this.toolPath}' failed because one or more lines were written to the STDERR stream`)):e=new Error(`The process '${this.toolPath}' failed with exit code ${this.processExitCode}`)),this.timeout&&(clearTimeout(this.timeout),this.timeout=null),this.done=!0,this.emit("done",e,this.processExitCode)}static HandleTimeout(e){if(!e.done){if(!e.processClosed&&e.processExited){const t=`The STDIO streams did not close within ${e.delay/1e3} seconds of the exit event from process '${e.toolPath}'. This may indicate a child process inherited the STDIO streams and has not yet exited.`
e._debug(t)}e._setResult()}}}},2429:function(e,t){"use strict"
var r=this&&this.__awaiter||function(e,t,r,n){return new(r||(r=Promise))((function(s,o){function i(e){try{c(n.next(e))}catch(e){o(e)}}function a(e){try{c(n.throw(e))}catch(e){o(e)}}function c(e){var t
e.done?s(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(i,a)}c((n=n.apply(e,t||[])).next())}))}
Object.defineProperty(t,"__esModule",{value:!0}),t.PersonalAccessTokenCredentialHandler=t.BearerCredentialHandler=t.BasicCredentialHandler=void 0
t.BasicCredentialHandler=class{constructor(e,t){this.username=e,this.password=t}prepareRequest(e){if(!e.headers)throw Error("The request has no headers")
e.headers.Authorization=`Basic ${Buffer.from(`${this.username}:${this.password}`).toString("base64")}`}canHandleAuthentication(){return!1}handleAuthentication(){return r(this,void 0,void 0,(function*(){throw new Error("not implemented")}))}}
t.BearerCredentialHandler=class{constructor(e){this.token=e}prepareRequest(e){if(!e.headers)throw Error("The request has no headers")
e.headers.Authorization=`Bearer ${this.token}`}canHandleAuthentication(){return!1}handleAuthentication(){return r(this,void 0,void 0,(function*(){throw new Error("not implemented")}))}}
t.PersonalAccessTokenCredentialHandler=class{constructor(e){this.token=e}prepareRequest(e){if(!e.headers)throw Error("The request has no headers")
e.headers.Authorization=`Basic ${Buffer.from(`PAT:${this.token}`).toString("base64")}`}canHandleAuthentication(){return!1}handleAuthentication(){return r(this,void 0,void 0,(function*(){throw new Error("not implemented")}))}}},4635:function(e,t,r){"use strict"
var n=this&&this.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r),Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[r]}})}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),s=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),o=this&&this.__importStar||function(e){if(e&&e.__esModule)return e
var t={}
if(null!=e)for(var r in e)"default"!==r&&Object.hasOwnProperty.call(e,r)&&n(t,e,r)
return s(t,e),t},i=this&&this.__awaiter||function(e,t,r,n){return new(r||(r=Promise))((function(s,o){function i(e){try{c(n.next(e))}catch(e){o(e)}}function a(e){try{c(n.throw(e))}catch(e){o(e)}}function c(e){var t
e.done?s(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(i,a)}c((n=n.apply(e,t||[])).next())}))}
Object.defineProperty(t,"__esModule",{value:!0}),t.HttpClient=t.isHttps=t.HttpClientResponse=t.HttpClientError=t.getProxyUrl=t.MediaTypes=t.Headers=t.HttpCodes=void 0
const a=o(r(3685)),c=o(r(5687)),u=o(r(7960)),l=o(r(6149))
var d,f,h
!function(e){e[e.OK=200]="OK",e[e.MultipleChoices=300]="MultipleChoices",e[e.MovedPermanently=301]="MovedPermanently",e[e.ResourceMoved=302]="ResourceMoved",e[e.SeeOther=303]="SeeOther",e[e.NotModified=304]="NotModified",e[e.UseProxy=305]="UseProxy",e[e.SwitchProxy=306]="SwitchProxy",e[e.TemporaryRedirect=307]="TemporaryRedirect",e[e.PermanentRedirect=308]="PermanentRedirect",e[e.BadRequest=400]="BadRequest",e[e.Unauthorized=401]="Unauthorized",e[e.PaymentRequired=402]="PaymentRequired",e[e.Forbidden=403]="Forbidden",e[e.NotFound=404]="NotFound",e[e.MethodNotAllowed=405]="MethodNotAllowed",e[e.NotAcceptable=406]="NotAcceptable",e[e.ProxyAuthenticationRequired=407]="ProxyAuthenticationRequired",e[e.RequestTimeout=408]="RequestTimeout",e[e.Conflict=409]="Conflict",e[e.Gone=410]="Gone",e[e.TooManyRequests=429]="TooManyRequests",e[e.InternalServerError=500]="InternalServerError",e[e.NotImplemented=501]="NotImplemented",e[e.BadGateway=502]="BadGateway",e[e.ServiceUnavailable=503]="ServiceUnavailable",e[e.GatewayTimeout=504]="GatewayTimeout"}(d=t.HttpCodes||(t.HttpCodes={})),function(e){e.Accept="accept",e.ContentType="content-type"}(f=t.Headers||(t.Headers={})),function(e){e.ApplicationJson="application/json"}(h=t.MediaTypes||(t.MediaTypes={})),t.getProxyUrl=function(e){const t=u.getProxyUrl(new URL(e))
return t?t.href:""}
const p=[d.MovedPermanently,d.ResourceMoved,d.SeeOther,d.TemporaryRedirect,d.PermanentRedirect],m=[d.BadGateway,d.ServiceUnavailable,d.GatewayTimeout],g=["OPTIONS","GET","DELETE","HEAD"]
class v extends Error{constructor(e,t){super(e),this.name="HttpClientError",this.statusCode=t,Object.setPrototypeOf(this,v.prototype)}}t.HttpClientError=v
class y{constructor(e){this.message=e}readBody(){return i(this,void 0,void 0,(function*(){return new Promise((e=>i(this,void 0,void 0,(function*(){let t=Buffer.alloc(0)
this.message.on("data",(e=>{t=Buffer.concat([t,e])})),this.message.on("end",(()=>{e(t.toString())}))}))))}))}}t.HttpClientResponse=y,t.isHttps=function(e){return"https:"===new URL(e).protocol}
t.HttpClient=class{constructor(e,t,r){this._ignoreSslError=!1,this._allowRedirects=!0,this._allowRedirectDowngrade=!1,this._maxRedirects=50,this._allowRetries=!1,this._maxRetries=1,this._keepAlive=!1,this._disposed=!1,this.userAgent=e,this.handlers=t||[],this.requestOptions=r,r&&(null!=r.ignoreSslError&&(this._ignoreSslError=r.ignoreSslError),this._socketTimeout=r.socketTimeout,null!=r.allowRedirects&&(this._allowRedirects=r.allowRedirects),null!=r.allowRedirectDowngrade&&(this._allowRedirectDowngrade=r.allowRedirectDowngrade),null!=r.maxRedirects&&(this._maxRedirects=Math.max(r.maxRedirects,0)),null!=r.keepAlive&&(this._keepAlive=r.keepAlive),null!=r.allowRetries&&(this._allowRetries=r.allowRetries),null!=r.maxRetries&&(this._maxRetries=r.maxRetries))}options(e,t){return i(this,void 0,void 0,(function*(){return this.request("OPTIONS",e,null,t||{})}))}get(e,t){return i(this,void 0,void 0,(function*(){return this.request("GET",e,null,t||{})}))}del(e,t){return i(this,void 0,void 0,(function*(){return this.request("DELETE",e,null,t||{})}))}post(e,t,r){return i(this,void 0,void 0,(function*(){return this.request("POST",e,t,r||{})}))}patch(e,t,r){return i(this,void 0,void 0,(function*(){return this.request("PATCH",e,t,r||{})}))}put(e,t,r){return i(this,void 0,void 0,(function*(){return this.request("PUT",e,t,r||{})}))}head(e,t){return i(this,void 0,void 0,(function*(){return this.request("HEAD",e,null,t||{})}))}sendStream(e,t,r,n){return i(this,void 0,void 0,(function*(){return this.request(e,t,r,n)}))}getJson(e,t={}){return i(this,void 0,void 0,(function*(){t[f.Accept]=this._getExistingOrDefaultHeader(t,f.Accept,h.ApplicationJson)
const r=yield this.get(e,t)
return this._processResponse(r,this.requestOptions)}))}postJson(e,t,r={}){return i(this,void 0,void 0,(function*(){const n=JSON.stringify(t,null,2)
r[f.Accept]=this._getExistingOrDefaultHeader(r,f.Accept,h.ApplicationJson),r[f.ContentType]=this._getExistingOrDefaultHeader(r,f.ContentType,h.ApplicationJson)
const s=yield this.post(e,n,r)
return this._processResponse(s,this.requestOptions)}))}putJson(e,t,r={}){return i(this,void 0,void 0,(function*(){const n=JSON.stringify(t,null,2)
r[f.Accept]=this._getExistingOrDefaultHeader(r,f.Accept,h.ApplicationJson),r[f.ContentType]=this._getExistingOrDefaultHeader(r,f.ContentType,h.ApplicationJson)
const s=yield this.put(e,n,r)
return this._processResponse(s,this.requestOptions)}))}patchJson(e,t,r={}){return i(this,void 0,void 0,(function*(){const n=JSON.stringify(t,null,2)
r[f.Accept]=this._getExistingOrDefaultHeader(r,f.Accept,h.ApplicationJson),r[f.ContentType]=this._getExistingOrDefaultHeader(r,f.ContentType,h.ApplicationJson)
const s=yield this.patch(e,n,r)
return this._processResponse(s,this.requestOptions)}))}request(e,t,r,n){return i(this,void 0,void 0,(function*(){if(this._disposed)throw new Error("Client has already been disposed.")
const s=new URL(t)
let o=this._prepareRequest(e,s,n)
const i=this._allowRetries&&g.includes(e)?this._maxRetries+1:1
let a,c=0
do{if(a=yield this.requestRaw(o,r),a&&a.message&&a.message.statusCode===d.Unauthorized){let e
for(const t of this.handlers)if(t.canHandleAuthentication(a)){e=t
break}return e?e.handleAuthentication(this,o,r):a}let t=this._maxRedirects
for(;a.message.statusCode&&p.includes(a.message.statusCode)&&this._allowRedirects&&t>0;){const i=a.message.headers.location
if(!i)break
const c=new URL(i)
if("https:"===s.protocol&&s.protocol!==c.protocol&&!this._allowRedirectDowngrade)throw new Error("Redirect from HTTPS to HTTP protocol. This downgrade is not allowed for security reasons. If you want to allow this behavior, set the allowRedirectDowngrade option to true.")
if(yield a.readBody(),c.hostname!==s.hostname)for(const e in n)"authorization"===e.toLowerCase()&&delete n[e]
o=this._prepareRequest(e,c,n),a=yield this.requestRaw(o,r),t--}if(!a.message.statusCode||!m.includes(a.message.statusCode))return a
c+=1,c<i&&(yield a.readBody(),yield this._performExponentialBackoff(c))}while(c<i)
return a}))}dispose(){this._agent&&this._agent.destroy(),this._disposed=!0}requestRaw(e,t){return i(this,void 0,void 0,(function*(){return new Promise(((r,n)=>{this.requestRawWithCallback(e,t,(function(e,t){e?n(e):t?r(t):n(new Error("Unknown error"))}))}))}))}requestRawWithCallback(e,t,r){"string"==typeof t&&(e.options.headers||(e.options.headers={}),e.options.headers["Content-Length"]=Buffer.byteLength(t,"utf8"))
let n=!1
function s(e,t){n||(n=!0,r(e,t))}const o=e.httpModule.request(e.options,(e=>{s(void 0,new y(e))}))
let i
o.on("socket",(e=>{i=e})),o.setTimeout(this._socketTimeout||18e4,(()=>{i&&i.end(),s(new Error(`Request timeout: ${e.options.path}`))})),o.on("error",(function(e){s(e)})),t&&"string"==typeof t&&o.write(t,"utf8"),t&&"string"!=typeof t?(t.on("close",(function(){o.end()})),t.pipe(o)):o.end()}getAgent(e){const t=new URL(e)
return this._getAgent(t)}_prepareRequest(e,t,r){const n={}
n.parsedUrl=t
const s="https:"===n.parsedUrl.protocol
n.httpModule=s?c:a
const o=s?443:80
if(n.options={},n.options.host=n.parsedUrl.hostname,n.options.port=n.parsedUrl.port?parseInt(n.parsedUrl.port):o,n.options.path=(n.parsedUrl.pathname||"")+(n.parsedUrl.search||""),n.options.method=e,n.options.headers=this._mergeHeaders(r),null!=this.userAgent&&(n.options.headers["user-agent"]=this.userAgent),n.options.agent=this._getAgent(n.parsedUrl),this.handlers)for(const e of this.handlers)e.prepareRequest(n.options)
return n}_mergeHeaders(e){return this.requestOptions&&this.requestOptions.headers?Object.assign({},w(this.requestOptions.headers),w(e||{})):w(e||{})}_getExistingOrDefaultHeader(e,t,r){let n
return this.requestOptions&&this.requestOptions.headers&&(n=w(this.requestOptions.headers)[t]),e[t]||n||r}_getAgent(e){let t
const r=u.getProxyUrl(e),n=r&&r.hostname
if(this._keepAlive&&n&&(t=this._proxyAgent),this._keepAlive&&!n&&(t=this._agent),t)return t
const s="https:"===e.protocol
let o=100
if(this.requestOptions&&(o=this.requestOptions.maxSockets||a.globalAgent.maxSockets),r&&r.hostname){const e={maxSockets:o,keepAlive:this._keepAlive,proxy:Object.assign(Object.assign({},(r.username||r.password)&&{proxyAuth:`${r.username}:${r.password}`}),{host:r.hostname,port:r.port})}
let n
const i="https:"===r.protocol
n=s?i?l.httpsOverHttps:l.httpsOverHttp:i?l.httpOverHttps:l.httpOverHttp,t=n(e),this._proxyAgent=t}if(this._keepAlive&&!t){const e={keepAlive:this._keepAlive,maxSockets:o}
t=s?new c.Agent(e):new a.Agent(e),this._agent=t}return t||(t=s?c.globalAgent:a.globalAgent),s&&this._ignoreSslError&&(t.options=Object.assign(t.options||{},{rejectUnauthorized:!1})),t}_performExponentialBackoff(e){return i(this,void 0,void 0,(function*(){e=Math.min(10,e)
const t=5*Math.pow(2,e)
return new Promise((e=>setTimeout((()=>e()),t)))}))}_processResponse(e,t){return i(this,void 0,void 0,(function*(){return new Promise(((r,n)=>i(this,void 0,void 0,(function*(){const s=e.message.statusCode||0,o={statusCode:s,result:null,headers:{}}
let i,a
s===d.NotFound&&r(o)
try{a=yield e.readBody(),a&&a.length>0&&(i=t&&t.deserializeDates?JSON.parse(a,(function(e,t){if("string"==typeof t){const e=new Date(t)
if(!isNaN(e.valueOf()))return e}return t})):JSON.parse(a),o.result=i),o.headers=e.message.headers}catch(e){}if(s>299){let e
e=i&&i.message?i.message:a&&a.length>0?a:`Failed request: (${s})`
const t=new v(e,s)
t.result=o.result,n(t)}else r(o)}))))}))}}
const w=e=>Object.keys(e).reduce(((t,r)=>(t[r.toLowerCase()]=e[r],t)),{})},7960:(e,t)=>{"use strict"
function r(e){if(!e.hostname)return!1
if(function(e){const t=e.toLowerCase()
return"localhost"===t||t.startsWith("127.")||t.startsWith("[::1]")||t.startsWith("[0:0:0:0:0:0:0:1]")}(e.hostname))return!0
const t=process.env.no_proxy||process.env.NO_PROXY||""
if(!t)return!1
let r
e.port?r=Number(e.port):"http:"===e.protocol?r=80:"https:"===e.protocol&&(r=443)
const n=[e.hostname.toUpperCase()]
"number"==typeof r&&n.push(`${n[0]}:${r}`)
for(const e of t.split(",").map((e=>e.trim().toUpperCase())).filter((e=>e)))if("*"===e||n.some((t=>t===e||t.endsWith(`.${e}`)||e.startsWith(".")&&t.endsWith(`${e}`))))return!0
return!1}Object.defineProperty(t,"__esModule",{value:!0}),t.checkBypass=t.getProxyUrl=void 0,t.getProxyUrl=function(e){const t="https:"===e.protocol
if(r(e))return
const n=t?process.env.https_proxy||process.env.HTTPS_PROXY:process.env.http_proxy||process.env.HTTP_PROXY
return n?new URL(n):void 0},t.checkBypass=r},7564:function(e,t,r){"use strict"
var n,s=this&&this.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r),Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[r]}})}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),o=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=this&&this.__importStar||function(e){if(e&&e.__esModule)return e
var t={}
if(null!=e)for(var r in e)"default"!==r&&Object.hasOwnProperty.call(e,r)&&s(t,e,r)
return o(t,e),t},a=this&&this.__awaiter||function(e,t,r,n){return new(r||(r=Promise))((function(s,o){function i(e){try{c(n.next(e))}catch(e){o(e)}}function a(e){try{c(n.throw(e))}catch(e){o(e)}}function c(e){var t
e.done?s(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(i,a)}c((n=n.apply(e,t||[])).next())}))}
Object.defineProperty(t,"__esModule",{value:!0}),t.getCmdPath=t.tryGetExecutablePath=t.isRooted=t.isDirectory=t.exists=t.READONLY=t.UV_FS_O_EXLOCK=t.IS_WINDOWS=t.unlink=t.symlink=t.stat=t.rmdir=t.rm=t.rename=t.readlink=t.readdir=t.open=t.mkdir=t.lstat=t.copyFile=t.chmod=void 0
const c=i(r(7147)),u=i(r(1017))
function l(e){return(1&e.mode)>0||(8&e.mode)>0&&e.gid===process.getgid()||(64&e.mode)>0&&e.uid===process.getuid()}n=c.promises,t.chmod=n.chmod,t.copyFile=n.copyFile,t.lstat=n.lstat,t.mkdir=n.mkdir,t.open=n.open,t.readdir=n.readdir,t.readlink=n.readlink,t.rename=n.rename,t.rm=n.rm,t.rmdir=n.rmdir,t.stat=n.stat,t.symlink=n.symlink,t.unlink=n.unlink,t.IS_WINDOWS="win32"===process.platform,t.UV_FS_O_EXLOCK=268435456,t.READONLY=c.constants.O_RDONLY,t.exists=function(e){return a(this,void 0,void 0,(function*(){try{yield t.stat(e)}catch(e){if("ENOENT"===e.code)return!1
throw e}return!0}))},t.isDirectory=function(e,r=!1){return a(this,void 0,void 0,(function*(){return(r?yield t.stat(e):yield t.lstat(e)).isDirectory()}))},t.isRooted=function(e){if(!(e=function(e){if(e=e||"",t.IS_WINDOWS)return(e=e.replace(/\//g,"\\")).replace(/\\\\+/g,"\\")
return e.replace(/\/\/+/g,"/")}(e)))throw new Error('isRooted() parameter "p" cannot be empty')
return t.IS_WINDOWS?e.startsWith("\\")||/^[A-Z]:/i.test(e):e.startsWith("/")},t.tryGetExecutablePath=function(e,r){return a(this,void 0,void 0,(function*(){let n
try{n=yield t.stat(e)}catch(t){"ENOENT"!==t.code&&console.log(`Unexpected error attempting to determine if executable file exists '${e}': ${t}`)}if(n&&n.isFile())if(t.IS_WINDOWS){const t=u.extname(e).toUpperCase()
if(r.some((e=>e.toUpperCase()===t)))return e}else if(l(n))return e
const s=e
for(const o of r){e=s+o,n=void 0
try{n=yield t.stat(e)}catch(t){"ENOENT"!==t.code&&console.log(`Unexpected error attempting to determine if executable file exists '${e}': ${t}`)}if(n&&n.isFile()){if(t.IS_WINDOWS){try{const r=u.dirname(e),n=u.basename(e).toUpperCase()
for(const s of yield t.readdir(r))if(n===s.toUpperCase()){e=u.join(r,s)
break}}catch(t){console.log(`Unexpected error attempting to determine the actual case of the file '${e}': ${t}`)}return e}if(l(n))return e}}return""}))},t.getCmdPath=function(){var e
return null!==(e=process.env.COMSPEC)&&void 0!==e?e:"cmd.exe"}},484:function(e,t,r){"use strict"
var n=this&&this.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r),Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[r]}})}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),s=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),o=this&&this.__importStar||function(e){if(e&&e.__esModule)return e
var t={}
if(null!=e)for(var r in e)"default"!==r&&Object.hasOwnProperty.call(e,r)&&n(t,e,r)
return s(t,e),t},i=this&&this.__awaiter||function(e,t,r,n){return new(r||(r=Promise))((function(s,o){function i(e){try{c(n.next(e))}catch(e){o(e)}}function a(e){try{c(n.throw(e))}catch(e){o(e)}}function c(e){var t
e.done?s(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(i,a)}c((n=n.apply(e,t||[])).next())}))}
Object.defineProperty(t,"__esModule",{value:!0}),t.findInPath=t.which=t.mkdirP=t.rmRF=t.mv=t.cp=void 0
const a=r(9491),c=o(r(1017)),u=o(r(7564))
function l(e){return i(this,void 0,void 0,(function*(){if(u.IS_WINDOWS&&/[*"<>|]/.test(e))throw new Error('File path must not contain `*`, `"`, `<`, `>` or `|` on Windows')
try{yield u.rm(e,{force:!0,maxRetries:3,recursive:!0,retryDelay:300})}catch(e){throw new Error(`File was unable to be removed ${e}`)}}))}function d(e){return i(this,void 0,void 0,(function*(){a.ok(e,"a path argument must be provided"),yield u.mkdir(e,{recursive:!0})}))}function f(e){return i(this,void 0,void 0,(function*(){if(!e)throw new Error("parameter 'tool' is required")
const t=[]
if(u.IS_WINDOWS&&process.env.PATHEXT)for(const e of process.env.PATHEXT.split(c.delimiter))e&&t.push(e)
if(u.isRooted(e)){const r=yield u.tryGetExecutablePath(e,t)
return r?[r]:[]}if(e.includes(c.sep))return[]
const r=[]
if(process.env.PATH)for(const e of process.env.PATH.split(c.delimiter))e&&r.push(e)
const n=[]
for(const s of r){const r=yield u.tryGetExecutablePath(c.join(s,e),t)
r&&n.push(r)}return n}))}function h(e,t,r,n){return i(this,void 0,void 0,(function*(){if(r>=255)return
r++,yield d(t)
const s=yield u.readdir(e)
for(const o of s){const s=`${e}/${o}`,i=`${t}/${o}`;(yield u.lstat(s)).isDirectory()?yield h(s,i,r,n):yield p(s,i,n)}yield u.chmod(t,(yield u.stat(e)).mode)}))}function p(e,t,r){return i(this,void 0,void 0,(function*(){if((yield u.lstat(e)).isSymbolicLink()){try{yield u.lstat(t),yield u.unlink(t)}catch(e){"EPERM"===e.code&&(yield u.chmod(t,"0666"),yield u.unlink(t))}const r=yield u.readlink(e)
yield u.symlink(r,t,u.IS_WINDOWS?"junction":null)}else(yield u.exists(t))&&!r||(yield u.copyFile(e,t))}))}t.cp=function(e,t,r={}){return i(this,void 0,void 0,(function*(){const{force:n,recursive:s,copySourceDirectory:o}=function(e){const t=null==e.force||e.force,r=Boolean(e.recursive),n=null==e.copySourceDirectory||Boolean(e.copySourceDirectory)
return{force:t,recursive:r,copySourceDirectory:n}}(r),i=(yield u.exists(t))?yield u.stat(t):null
if(i&&i.isFile()&&!n)return
const a=i&&i.isDirectory()&&o?c.join(t,c.basename(e)):t
if(!(yield u.exists(e)))throw new Error(`no such file or directory: ${e}`)
if((yield u.stat(e)).isDirectory()){if(!s)throw new Error(`Failed to copy. ${e} is a directory, but tried to copy without recursive flag.`)
yield h(e,a,0,n)}else{if(""===c.relative(e,a))throw new Error(`'${a}' and '${e}' are the same file`)
yield p(e,a,n)}}))},t.mv=function(e,t,r={}){return i(this,void 0,void 0,(function*(){if(yield u.exists(t)){let n=!0
if((yield u.isDirectory(t))&&(t=c.join(t,c.basename(e)),n=yield u.exists(t)),n){if(null!=r.force&&!r.force)throw new Error("Destination already exists")
yield l(t)}}yield d(c.dirname(t)),yield u.rename(e,t)}))},t.rmRF=l,t.mkdirP=d,t.which=function e(t,r){return i(this,void 0,void 0,(function*(){if(!t)throw new Error("parameter 'tool' is required")
if(r){const r=yield e(t,!1)
if(!r)throw u.IS_WINDOWS?new Error(`Unable to locate executable file: ${t}. Please verify either the file path exists or the file can be found within a directory specified by the PATH environment variable. Also verify the file has a valid extension for an executable file.`):new Error(`Unable to locate executable file: ${t}. Please verify either the file path exists or the file can be found within a directory specified by the PATH environment variable. Also check the file mode to verify the file is executable.`)
return r}const n=yield f(t)
return n&&n.length>0?n[0]:""}))},t.findInPath=f},3361:function(e,t,r){"use strict"
var n=this&&this.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r),Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[r]}})}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),s=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),o=this&&this.__importStar||function(e){if(e&&e.__esModule)return e
var t={}
if(null!=e)for(var r in e)"default"!==r&&Object.hasOwnProperty.call(e,r)&&n(t,e,r)
return s(t,e),t},i=this&&this.__awaiter||function(e,t,r,n){return new(r||(r=Promise))((function(s,o){function i(e){try{c(n.next(e))}catch(e){o(e)}}function a(e){try{c(n.throw(e))}catch(e){o(e)}}function c(e){var t
e.done?s(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(i,a)}c((n=n.apply(e,t||[])).next())}))}
Object.defineProperty(t,"__esModule",{value:!0}),t._readLinuxVersionFile=t._getOsVersion=t._findMatch=void 0
const a=o(r(6625)),c=r(2225),u=r(2037),l=r(2081),d=r(7147)
t._findMatch=function(t,r,n,s){return i(this,void 0,void 0,(function*(){const o=u.platform()
let i,l,d
for(const i of n){const n=i.version
if(c.debug(`check ${n} satisfies ${t}`),a.satisfies(n,t)&&(!r||i.stable===r)&&(d=i.files.find((t=>{c.debug(`${t.arch}===${s} && ${t.platform}===${o}`)
let r=t.arch===s&&t.platform===o
if(r&&t.platform_version){const n=e.exports._getOsVersion()
r=n===t.platform_version||a.satisfies(n,t.platform_version)}return r})),d)){c.debug(`matched ${i.version}`),l=i
break}}return l&&d&&(i=Object.assign({},l),i.files=[d]),i}))},t._getOsVersion=function(){const t=u.platform()
let r=""
if("darwin"===t)r=l.execSync("sw_vers -productVersion").toString()
else if("linux"===t){const t=e.exports._readLinuxVersionFile()
if(t){const e=t.split("\n")
for(const t of e){const e=t.split("=")
if(2===e.length&&("VERSION_ID"===e[0].trim()||"DISTRIB_RELEASE"===e[0].trim())){r=e[1].trim().replace(/^"/,"").replace(/"$/,"")
break}}}}return r},t._readLinuxVersionFile=function(){const e="/etc/lsb-release",t="/etc/os-release"
let r=""
return d.existsSync(e)?r=d.readFileSync(e).toString():d.existsSync(t)&&(r=d.readFileSync(t).toString()),r}},1804:function(e,t,r){"use strict"
var n=this&&this.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r),Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[r]}})}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),s=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),o=this&&this.__importStar||function(e){if(e&&e.__esModule)return e
var t={}
if(null!=e)for(var r in e)"default"!==r&&Object.hasOwnProperty.call(e,r)&&n(t,e,r)
return s(t,e),t},i=this&&this.__awaiter||function(e,t,r,n){return new(r||(r=Promise))((function(s,o){function i(e){try{c(n.next(e))}catch(e){o(e)}}function a(e){try{c(n.throw(e))}catch(e){o(e)}}function c(e){var t
e.done?s(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(i,a)}c((n=n.apply(e,t||[])).next())}))}
Object.defineProperty(t,"__esModule",{value:!0}),t.RetryHelper=void 0
const a=o(r(2225))
t.RetryHelper=class{constructor(e,t,r){if(e<1)throw new Error("max attempts should be greater than or equal to 1")
if(this.maxAttempts=e,this.minSeconds=Math.floor(t),this.maxSeconds=Math.floor(r),this.minSeconds>this.maxSeconds)throw new Error("min seconds should be less than or equal to max seconds")}execute(e,t){return i(this,void 0,void 0,(function*(){let r=1
for(;r<this.maxAttempts;){try{return yield e()}catch(e){if(t&&!t(e))throw e
a.info(e.message)}const n=this.getSleepAmount()
a.info(`Waiting ${n} seconds before trying again`),yield this.sleep(n),r++}return yield e()}))}getSleepAmount(){return Math.floor(Math.random()*(this.maxSeconds-this.minSeconds+1))+this.minSeconds}sleep(e){return i(this,void 0,void 0,(function*(){return new Promise((t=>setTimeout(t,1e3*e)))}))}}},4392:function(e,t,r){"use strict"
var n=this&&this.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r),Object.defineProperty(e,n,{enumerable:!0,get:function(){return t[r]}})}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),s=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),o=this&&this.__importStar||function(e){if(e&&e.__esModule)return e
var t={}
if(null!=e)for(var r in e)"default"!==r&&Object.hasOwnProperty.call(e,r)&&n(t,e,r)
return s(t,e),t},i=this&&this.__awaiter||function(e,t,r,n){return new(r||(r=Promise))((function(s,o){function i(e){try{c(n.next(e))}catch(e){o(e)}}function a(e){try{c(n.throw(e))}catch(e){o(e)}}function c(e){var t
e.done?s(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(i,a)}c((n=n.apply(e,t||[])).next())}))},a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}}
Object.defineProperty(t,"__esModule",{value:!0}),t.evaluateVersions=t.isExplicitVersion=t.findFromManifest=t.getManifestFromRepo=t.findAllVersions=t.find=t.cacheFile=t.cacheDir=t.extractZip=t.extractXar=t.extractTar=t.extract7z=t.downloadTool=t.HTTPError=void 0
const c=o(r(2225)),u=o(r(484)),l=o(r(7147)),d=o(r(3361)),f=o(r(2037)),h=o(r(1017)),p=o(r(4635)),m=o(r(6625)),g=o(r(2781)),v=o(r(3837)),y=r(9491),w=a(r(2131)),E=r(27),b=r(1804)
class O extends Error{constructor(e){super(`Unexpected HTTP response: ${e}`),this.httpStatusCode=e,Object.setPrototypeOf(this,new.target.prototype)}}t.HTTPError=O
const _="win32"===process.platform,T="darwin"===process.platform,R="actions/tool-cache"
function C(e,t){const r=[]
t=t||f.arch()
const n=h.join(P(),e)
if(l.existsSync(n)){const e=l.readdirSync(n)
for(const s of e)if(A(s)){const e=h.join(n,s,t||"")
l.existsSync(e)&&l.existsSync(`${e}.complete`)&&r.push(s)}}return r}function S(e){return i(this,void 0,void 0,(function*(){return e||(e=h.join(L(),w.default())),yield u.mkdirP(e),e}))}function k(e,t,r){return i(this,void 0,void 0,(function*(){const n=h.join(P(),e,m.clean(t)||t,r||"")
c.debug(`destination ${n}`)
const s=`${n}.complete`
return yield u.rmRF(n),yield u.rmRF(s),yield u.mkdirP(n),n}))}function x(e,t,r){const n=`${h.join(P(),e,m.clean(t)||t,r||"")}.complete`
l.writeFileSync(n,""),c.debug("finished caching tool")}function A(e){const t=m.clean(e)||""
c.debug(`isExplicit: ${t}`)
const r=null!=m.valid(t)
return c.debug(`explicit? ${r}`),r}function I(e,t){let r=""
c.debug(`evaluating ${e.length} versions`)
for(let n=(e=e.sort(((e,t)=>m.gt(e,t)?1:-1))).length-1;n>=0;n--){const s=e[n]
if(m.satisfies(s,t)){r=s
break}}return r?c.debug(`matched: ${r}`):c.debug("match not found"),r}function P(){const e=process.env.RUNNER_TOOL_CACHE||""
return y.ok(e,"Expected RUNNER_TOOL_CACHE to be defined"),e}function L(){const e=process.env.RUNNER_TEMP||""
return y.ok(e,"Expected RUNNER_TEMP to be defined"),e}function N(e,t){const r=global[e]
return void 0!==r?r:t}t.downloadTool=function(e,t,r,n){return i(this,void 0,void 0,(function*(){t=t||h.join(L(),w.default()),yield u.mkdirP(h.dirname(t)),c.debug(`Downloading ${e}`),c.debug(`Destination ${t}`)
const s=N("TEST_DOWNLOAD_TOOL_RETRY_MIN_SECONDS",10),o=N("TEST_DOWNLOAD_TOOL_RETRY_MAX_SECONDS",20),a=new b.RetryHelper(3,s,o)
return yield a.execute((()=>i(this,void 0,void 0,(function*(){return yield function(e,t,r,n){return i(this,void 0,void 0,(function*(){if(l.existsSync(t))throw new Error(`Destination file path ${t} already exists`)
const s=new p.HttpClient(R,[],{allowRetries:!1})
r&&(c.debug("set auth"),void 0===n&&(n={}),n.authorization=r)
const o=yield s.get(e,n)
if(200!==o.message.statusCode){const t=new O(o.message.statusCode)
throw c.debug(`Failed to download from "${e}". Code(${o.message.statusCode}) Message(${o.message.statusMessage})`),t}const i=v.promisify(g.pipeline),a=N("TEST_DOWNLOAD_TOOL_RESPONSE_MESSAGE_FACTORY",(()=>o.message))()
let d=!1
try{return yield i(a,l.createWriteStream(t)),c.debug("download complete"),d=!0,t}finally{if(!d){c.debug("download failed")
try{yield u.rmRF(t)}catch(e){c.debug(`Failed to delete '${t}'. ${e.message}`)}}}}))}(e,t||"",r,n)}))),(e=>!(e instanceof O&&e.httpStatusCode&&e.httpStatusCode<500&&408!==e.httpStatusCode&&429!==e.httpStatusCode)))}))},t.extract7z=function(e,t,r){return i(this,void 0,void 0,(function*(){y.ok(_,"extract7z() not supported on current OS"),y.ok(e,'parameter "file" is required'),t=yield S(t)
const n=process.cwd()
if(process.chdir(t),r)try{const t=["x",c.isDebug()?"-bb1":"-bb0","-bd","-sccUTF-8",e],n={silent:!0}
yield E.exec(`"${r}"`,t,n)}finally{process.chdir(n)}else{const r=["-NoLogo","-Sta","-NoProfile","-NonInteractive","-ExecutionPolicy","Unrestricted","-Command",`& '${h.join(__dirname,"..","scripts","Invoke-7zdec.ps1").replace(/'/g,"''").replace(/"|\n|\r/g,"")}' -Source '${e.replace(/'/g,"''").replace(/"|\n|\r/g,"")}' -Target '${t.replace(/'/g,"''").replace(/"|\n|\r/g,"")}'`],s={silent:!0}
try{const e=yield u.which("powershell",!0)
yield E.exec(`"${e}"`,r,s)}finally{process.chdir(n)}}return t}))},t.extractTar=function(e,t,r="xz"){return i(this,void 0,void 0,(function*(){if(!e)throw new Error("parameter 'file' is required")
t=yield S(t),c.debug("Checking tar --version")
let n=""
yield E.exec("tar --version",[],{ignoreReturnCode:!0,silent:!0,listeners:{stdout:e=>n+=e.toString(),stderr:e=>n+=e.toString()}}),c.debug(n.trim())
const s=n.toUpperCase().includes("GNU TAR")
let o
o=r instanceof Array?r:[r],c.isDebug()&&!r.includes("v")&&o.push("-v")
let i=t,a=e
return _&&s&&(o.push("--force-local"),i=t.replace(/\\/g,"/"),a=e.replace(/\\/g,"/")),s&&(o.push("--warning=no-unknown-keyword"),o.push("--overwrite")),o.push("-C",i,"-f",a),yield E.exec("tar",o),t}))},t.extractXar=function(e,t,r=[]){return i(this,void 0,void 0,(function*(){let n
y.ok(T,"extractXar() not supported on current OS"),y.ok(e,'parameter "file" is required'),t=yield S(t),n=r instanceof Array?r:[r],n.push("-x","-C",t,"-f",e),c.isDebug()&&n.push("-v")
const s=yield u.which("xar",!0)
var o
return yield E.exec(`"${s}"`,(o=n,Array.from(new Set(o)))),t}))},t.extractZip=function(e,t){return i(this,void 0,void 0,(function*(){if(!e)throw new Error("parameter 'file' is required")
return t=yield S(t),_?yield function(e,t){return i(this,void 0,void 0,(function*(){const r=e.replace(/'/g,"''").replace(/"|\n|\r/g,""),n=t.replace(/'/g,"''").replace(/"|\n|\r/g,""),s=yield u.which("pwsh",!1)
if(s){const e=["-NoLogo","-NoProfile","-NonInteractive","-ExecutionPolicy","Unrestricted","-Command",["$ErrorActionPreference = 'Stop' ;","try { Add-Type -AssemblyName System.IO.Compression.ZipFile } catch { } ;",`try { [System.IO.Compression.ZipFile]::ExtractToDirectory('${r}', '${n}', $true) }`,`catch { if (($_.Exception.GetType().FullName -eq 'System.Management.Automation.MethodException') -or ($_.Exception.GetType().FullName -eq 'System.Management.Automation.RuntimeException') ){ Expand-Archive -LiteralPath '${r}' -DestinationPath '${n}' -Force } else { throw $_ } } ;`].join(" ")]
c.debug(`Using pwsh at path: ${s}`),yield E.exec(`"${s}"`,e)}else{const e=["-NoLogo","-Sta","-NoProfile","-NonInteractive","-ExecutionPolicy","Unrestricted","-Command",["$ErrorActionPreference = 'Stop' ;","try { Add-Type -AssemblyName System.IO.Compression.FileSystem } catch { } ;",`if ((Get-Command -Name Expand-Archive -Module Microsoft.PowerShell.Archive -ErrorAction Ignore)) { Expand-Archive -LiteralPath '${r}' -DestinationPath '${n}' -Force }`,`else {[System.IO.Compression.ZipFile]::ExtractToDirectory('${r}', '${n}', $true) }`].join(" ")],t=yield u.which("powershell",!0)
c.debug(`Using powershell at path: ${t}`),yield E.exec(`"${t}"`,e)}}))}(e,t):yield function(e,t){return i(this,void 0,void 0,(function*(){const r=yield u.which("unzip",!0),n=[e]
c.isDebug()||n.unshift("-q"),n.unshift("-o"),yield E.exec(`"${r}"`,n,{cwd:t})}))}(e,t),t}))},t.cacheDir=function(e,t,r,n){return i(this,void 0,void 0,(function*(){if(r=m.clean(r)||r,n=n||f.arch(),c.debug(`Caching tool ${t} ${r} ${n}`),c.debug(`source dir: ${e}`),!l.statSync(e).isDirectory())throw new Error("sourceDir is not a directory")
const s=yield k(t,r,n)
for(const t of l.readdirSync(e)){const r=h.join(e,t)
yield u.cp(r,s,{recursive:!0})}return x(t,r,n),s}))},t.cacheFile=function(e,t,r,n,s){return i(this,void 0,void 0,(function*(){if(n=m.clean(n)||n,s=s||f.arch(),c.debug(`Caching tool ${r} ${n} ${s}`),c.debug(`source file: ${e}`),!l.statSync(e).isFile())throw new Error("sourceFile is not a file")
const o=yield k(r,n,s),i=h.join(o,t)
return c.debug(`destination file ${i}`),yield u.cp(e,i),x(r,n,s),o}))},t.find=function(e,t,r){if(!e)throw new Error("toolName parameter is required")
if(!t)throw new Error("versionSpec parameter is required")
if(r=r||f.arch(),!A(t)){t=I(C(e,r),t)}let n=""
if(t){t=m.clean(t)||""
const s=h.join(P(),e,t,r)
c.debug(`checking cache: ${s}`),l.existsSync(s)&&l.existsSync(`${s}.complete`)?(c.debug(`Found tool in cache ${e} ${t} ${r}`),n=s):c.debug("not found")}return n},t.findAllVersions=C,t.getManifestFromRepo=function(e,t,r,n="master"){return i(this,void 0,void 0,(function*(){let s=[]
const o=`https://api.github.com/repos/${e}/${t}/git/trees/${n}`,i=new p.HttpClient("tool-cache"),a={}
r&&(c.debug("set auth"),a.authorization=r)
const u=yield i.getJson(o,a)
if(!u.result)return s
let l=""
for(const e of u.result.tree)if("versions-manifest.json"===e.path){l=e.url
break}a.accept="application/vnd.github.VERSION.raw"
let d=yield(yield i.get(l,a)).readBody()
if(d){d=d.replace(/^\uFEFF/,"")
try{s=JSON.parse(d)}catch(e){c.debug("Invalid json")}}return s}))},t.findFromManifest=function(e,t,r,n=f.arch()){return i(this,void 0,void 0,(function*(){return yield d._findMatch(e,t,r,n)}))},t.isExplicitVersion=A,t.evaluateVersions=I},7905:e=>{for(var t=[],r=0;r<256;++r)t[r]=(r+256).toString(16).substr(1)
e.exports=function(e,r){var n=r||0,s=t
return[s[e[n++]],s[e[n++]],s[e[n++]],s[e[n++]],"-",s[e[n++]],s[e[n++]],"-",s[e[n++]],s[e[n++]],"-",s[e[n++]],s[e[n++]],"-",s[e[n++]],s[e[n++]],s[e[n++]],s[e[n++]],s[e[n++]],s[e[n++]]].join("")}},9708:(e,t,r)=>{var n=r(6113)
e.exports=function(){return n.randomBytes(16)}},2131:(e,t,r)=>{var n=r(9708),s=r(7905)
e.exports=function(e,t,r){var o=t&&r||0
"string"==typeof e&&(t="binary"===e?new Array(16):null,e=null)
var i=(e=e||{}).random||(e.rng||n)()
if(i[6]=15&i[6]|64,i[8]=63&i[8]|128,t)for(var a=0;a<16;++a)t[o+a]=i[a]
return t||s(i)}},1513:(e,t,r)=>{"use strict"
Object.defineProperty(t,"__esModule",{value:!0}),function(e){for(var r in e)t.hasOwnProperty(r)||(t[r]=e[r])}(r(3593))},3593:function(e,t,r){"use strict"
var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}}
Object.defineProperty(t,"__esModule",{value:!0})
const s=r(7147),o=n(r(5158)).default("@kwsites/file-exists")
t.exists=function(e,r=t.READABLE){return function(e,t,r){o("checking %s",e)
try{const n=s.statSync(e)
return n.isFile()&&t?(o("[OK] path represents a file"),!0):n.isDirectory()&&r?(o("[OK] path represents a directory"),!0):(o("[FAIL] path represents something other than a file or directory"),!1)}catch(e){if("ENOENT"===e.code)return o("[FAIL] path is not accessible: %o",e),!1
throw o("[FATAL] %o",e),e}}(e,(r&t.FILE)>0,(r&t.FOLDER)>0)},t.FILE=1,t.FOLDER=2,t.READABLE=t.FILE+t.FOLDER},2443:(e,t)=>{"use strict"
function r(){let e,t,r="pending"
return{promise:new Promise(((r,n)=>{e=r,t=n})),done(t){"pending"===r&&(r="resolved",e(t))},fail(e){"pending"===r&&(r="rejected",t(e))},get fulfilled(){return"pending"!==r},get status(){return r}}}Object.defineProperty(t,"__esModule",{value:!0}),t.createDeferred=t.deferred=void 0,t.deferred=r,t.createDeferred=r,t.default=r},1227:(e,t,r)=>{t.formatArgs=function(t){if(t[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+t[0]+(this.useColors?"%c ":" ")+"+"+e.exports.humanize(this.diff),!this.useColors)return
const r="color: "+this.color
t.splice(1,0,r,"color: inherit")
let n=0,s=0
t[0].replace(/%[a-zA-Z%]/g,(e=>{"%%"!==e&&(n++,"%c"===e&&(s=n))})),t.splice(s,0,r)},t.save=function(e){try{e?t.storage.setItem("debug",e):t.storage.removeItem("debug")}catch(e){}},t.load=function(){let e
try{e=t.storage.getItem("debug")}catch(e){}!e&&"undefined"!=typeof process&&"env"in process&&(e=process.env.DEBUG)
return e},t.useColors=function(){if("undefined"!=typeof window&&window.process&&("renderer"===window.process.type||window.process.__nwjs))return!0
if("undefined"!=typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))return!1
return"undefined"!=typeof document&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||"undefined"!=typeof window&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||"undefined"!=typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)&&parseInt(RegExp.$1,10)>=31||"undefined"!=typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)},t.storage=function(){try{return localStorage}catch(e){}}(),t.destroy=(()=>{let e=!1
return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})(),t.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"],t.log=console.debug||console.log||(()=>{}),e.exports=r(2447)(t)
const{formatters:n}=e.exports
n.j=function(e){try{return JSON.stringify(e)}catch(e){return"[UnexpectedJSONParseError]: "+e.message}}},2447:(e,t,r)=>{e.exports=function(e){function t(e){let r,s,o,i=null
function a(...e){if(!a.enabled)return
const n=a,s=Number(new Date),o=s-(r||s)
n.diff=o,n.prev=r,n.curr=s,r=s,e[0]=t.coerce(e[0]),"string"!=typeof e[0]&&e.unshift("%O")
let i=0
e[0]=e[0].replace(/%([a-zA-Z%])/g,((r,s)=>{if("%%"===r)return"%"
i++
const o=t.formatters[s]
if("function"==typeof o){const t=e[i]
r=o.call(n,t),e.splice(i,1),i--}return r})),t.formatArgs.call(n,e);(n.log||t.log).apply(n,e)}return a.namespace=e,a.useColors=t.useColors(),a.color=t.selectColor(e),a.extend=n,a.destroy=t.destroy,Object.defineProperty(a,"enabled",{enumerable:!0,configurable:!1,get:()=>null!==i?i:(s!==t.namespaces&&(s=t.namespaces,o=t.enabled(e)),o),set:e=>{i=e}}),"function"==typeof t.init&&t.init(a),a}function n(e,r){const n=t(this.namespace+(void 0===r?":":r)+e)
return n.log=this.log,n}function s(e){return e.toString().substring(2,e.toString().length-2).replace(/\.\*\?$/,"*")}return t.debug=t,t.default=t,t.coerce=function(e){if(e instanceof Error)return e.stack||e.message
return e},t.disable=function(){const e=[...t.names.map(s),...t.skips.map(s).map((e=>"-"+e))].join(",")
return t.enable(""),e},t.enable=function(e){let r
t.save(e),t.namespaces=e,t.names=[],t.skips=[]
const n=("string"==typeof e?e:"").split(/[\s,]+/),s=n.length
for(r=0;r<s;r++)n[r]&&("-"===(e=n[r].replace(/\*/g,".*?"))[0]?t.skips.push(new RegExp("^"+e.slice(1)+"$")):t.names.push(new RegExp("^"+e+"$")))},t.enabled=function(e){if("*"===e[e.length-1])return!0
let r,n
for(r=0,n=t.skips.length;r<n;r++)if(t.skips[r].test(e))return!1
for(r=0,n=t.names.length;r<n;r++)if(t.names[r].test(e))return!0
return!1},t.humanize=r(7824),t.destroy=function(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")},Object.keys(e).forEach((r=>{t[r]=e[r]})),t.names=[],t.skips=[],t.formatters={},t.selectColor=function(e){let r=0
for(let t=0;t<e.length;t++)r=(r<<5)-r+e.charCodeAt(t),r|=0
return t.colors[Math.abs(r)%t.colors.length]},t.enable(t.load()),t}},5158:(e,t,r)=>{"undefined"==typeof process||"renderer"===process.type||!0===process.browser||process.__nwjs?e.exports=r(1227):e.exports=r(39)},39:(e,t,r)=>{const n=r(6224),s=r(3837)
t.init=function(e){e.inspectOpts={}
const r=Object.keys(t.inspectOpts)
for(let n=0;n<r.length;n++)e.inspectOpts[r[n]]=t.inspectOpts[r[n]]},t.log=function(...e){return process.stderr.write(s.format(...e)+"\n")},t.formatArgs=function(r){const{namespace:n,useColors:s}=this
if(s){const t=this.color,s="[3"+(t<8?t:"8;5;"+t),o=`  ${s};1m${n} [0m`
r[0]=o+r[0].split("\n").join("\n"+o),r.push(s+"m+"+e.exports.humanize(this.diff)+"[0m")}else r[0]=function(){if(t.inspectOpts.hideDate)return""
return(new Date).toISOString()+" "}()+n+" "+r[0]},t.save=function(e){e?process.env.DEBUG=e:delete process.env.DEBUG},t.load=function(){return process.env.DEBUG},t.useColors=function(){return"colors"in t.inspectOpts?Boolean(t.inspectOpts.colors):n.isatty(process.stderr.fd)},t.destroy=s.deprecate((()=>{}),"Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."),t.colors=[6,2,3,4,5,1]
try{const e=r(2130)
e&&(e.stderr||e).level>=2&&(t.colors=[20,21,26,27,32,33,38,39,40,41,42,43,44,45,56,57,62,63,68,69,74,75,76,77,78,79,80,81,92,93,98,99,112,113,128,129,134,135,148,149,160,161,162,163,164,165,166,167,168,169,170,171,172,173,178,179,184,185,196,197,198,199,200,201,202,203,204,205,206,207,208,209,214,215,220,221])}catch(e){}t.inspectOpts=Object.keys(process.env).filter((e=>/^debug_/i.test(e))).reduce(((e,t)=>{const r=t.substring(6).toLowerCase().replace(/_([a-z])/g,((e,t)=>t.toUpperCase()))
let n=process.env[t]
return n=!!/^(yes|on|true|enabled)$/i.test(n)||!/^(no|off|false|disabled)$/i.test(n)&&("null"===n?null:Number(n)),e[r]=n,e}),{}),e.exports=r(2447)(t)
const{formatters:o}=e.exports
o.o=function(e){return this.inspectOpts.colors=this.useColors,s.inspect(e,this.inspectOpts).split("\n").map((e=>e.trim())).join(" ")},o.O=function(e){return this.inspectOpts.colors=this.useColors,s.inspect(e,this.inspectOpts)}},6560:e=>{"use strict"
e.exports=(e,t=process.argv)=>{const r=e.startsWith("-")?"":1===e.length?"-":"--",n=t.indexOf(r+e),s=t.indexOf("--")
return-1!==n&&(-1===s||n<s)}},7824:e=>{var t=1e3,r=60*t,n=60*r,s=24*n,o=7*s,i=365.25*s
function a(e,t,r,n){var s=t>=1.5*r
return Math.round(e/r)+" "+n+(s?"s":"")}e.exports=function(e,c){c=c||{}
var u=typeof e
if("string"===u&&e.length>0)return function(e){if((e=String(e)).length>100)return
var a=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e)
if(!a)return
var c=parseFloat(a[1])
switch((a[2]||"ms").toLowerCase()){case"years":case"year":case"yrs":case"yr":case"y":return c*i
case"weeks":case"week":case"w":return c*o
case"days":case"day":case"d":return c*s
case"hours":case"hour":case"hrs":case"hr":case"h":return c*n
case"minutes":case"minute":case"mins":case"min":case"m":return c*r
case"seconds":case"second":case"secs":case"sec":case"s":return c*t
case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return c
default:return}}(e)
if("number"===u&&isFinite(e))return c.long?function(e){var o=Math.abs(e)
if(o>=s)return a(e,o,s,"day")
if(o>=n)return a(e,o,n,"hour")
if(o>=r)return a(e,o,r,"minute")
if(o>=t)return a(e,o,t,"second")
return e+" ms"}(e):function(e){var o=Math.abs(e)
if(o>=s)return Math.round(e/s)+"d"
if(o>=n)return Math.round(e/n)+"h"
if(o>=r)return Math.round(e/r)+"m"
if(o>=t)return Math.round(e/t)+"s"
return e+"ms"}(e)
throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))}},6625:(e,t)=>{var r
t=e.exports=v,r="object"==typeof process&&process.env&&process.env.NODE_DEBUG&&/\bsemver\b/i.test(process.env.NODE_DEBUG)?function(){var e=Array.prototype.slice.call(arguments,0)
e.unshift("SEMVER"),console.log.apply(console,e)}:function(){},t.SEMVER_SPEC_VERSION="2.0.0"
var n=256,s=Number.MAX_SAFE_INTEGER||9007199254740991,o=n-6,i=t.re=[],a=t.safeRe=[],c=t.src=[],u=t.tokens={},l=0
function d(e){u[e]=l++}var f="[a-zA-Z0-9-]",h=[["\\s",1],["\\d",n],[f,o]]
function p(e){for(var t=0;t<h.length;t++){var r=h[t][0],n=h[t][1]
e=e.split(r+"*").join(r+"{0,"+n+"}").split(r+"+").join(r+"{1,"+n+"}")}return e}d("NUMERICIDENTIFIER"),c[u.NUMERICIDENTIFIER]="0|[1-9]\\d*",d("NUMERICIDENTIFIERLOOSE"),c[u.NUMERICIDENTIFIERLOOSE]="\\d+",d("NONNUMERICIDENTIFIER"),c[u.NONNUMERICIDENTIFIER]="\\d*[a-zA-Z-]"+f+"*",d("MAINVERSION"),c[u.MAINVERSION]="("+c[u.NUMERICIDENTIFIER]+")\\.("+c[u.NUMERICIDENTIFIER]+")\\.("+c[u.NUMERICIDENTIFIER]+")",d("MAINVERSIONLOOSE"),c[u.MAINVERSIONLOOSE]="("+c[u.NUMERICIDENTIFIERLOOSE]+")\\.("+c[u.NUMERICIDENTIFIERLOOSE]+")\\.("+c[u.NUMERICIDENTIFIERLOOSE]+")",d("PRERELEASEIDENTIFIER"),c[u.PRERELEASEIDENTIFIER]="(?:"+c[u.NUMERICIDENTIFIER]+"|"+c[u.NONNUMERICIDENTIFIER]+")",d("PRERELEASEIDENTIFIERLOOSE"),c[u.PRERELEASEIDENTIFIERLOOSE]="(?:"+c[u.NUMERICIDENTIFIERLOOSE]+"|"+c[u.NONNUMERICIDENTIFIER]+")",d("PRERELEASE"),c[u.PRERELEASE]="(?:-("+c[u.PRERELEASEIDENTIFIER]+"(?:\\."+c[u.PRERELEASEIDENTIFIER]+")*))",d("PRERELEASELOOSE"),c[u.PRERELEASELOOSE]="(?:-?("+c[u.PRERELEASEIDENTIFIERLOOSE]+"(?:\\."+c[u.PRERELEASEIDENTIFIERLOOSE]+")*))",d("BUILDIDENTIFIER"),c[u.BUILDIDENTIFIER]=f+"+",d("BUILD"),c[u.BUILD]="(?:\\+("+c[u.BUILDIDENTIFIER]+"(?:\\."+c[u.BUILDIDENTIFIER]+")*))",d("FULL"),d("FULLPLAIN"),c[u.FULLPLAIN]="v?"+c[u.MAINVERSION]+c[u.PRERELEASE]+"?"+c[u.BUILD]+"?",c[u.FULL]="^"+c[u.FULLPLAIN]+"$",d("LOOSEPLAIN"),c[u.LOOSEPLAIN]="[v=\\s]*"+c[u.MAINVERSIONLOOSE]+c[u.PRERELEASELOOSE]+"?"+c[u.BUILD]+"?",d("LOOSE"),c[u.LOOSE]="^"+c[u.LOOSEPLAIN]+"$",d("GTLT"),c[u.GTLT]="((?:<|>)?=?)",d("XRANGEIDENTIFIERLOOSE"),c[u.XRANGEIDENTIFIERLOOSE]=c[u.NUMERICIDENTIFIERLOOSE]+"|x|X|\\*",d("XRANGEIDENTIFIER"),c[u.XRANGEIDENTIFIER]=c[u.NUMERICIDENTIFIER]+"|x|X|\\*",d("XRANGEPLAIN"),c[u.XRANGEPLAIN]="[v=\\s]*("+c[u.XRANGEIDENTIFIER]+")(?:\\.("+c[u.XRANGEIDENTIFIER]+")(?:\\.("+c[u.XRANGEIDENTIFIER]+")(?:"+c[u.PRERELEASE]+")?"+c[u.BUILD]+"?)?)?",d("XRANGEPLAINLOOSE"),c[u.XRANGEPLAINLOOSE]="[v=\\s]*("+c[u.XRANGEIDENTIFIERLOOSE]+")(?:\\.("+c[u.XRANGEIDENTIFIERLOOSE]+")(?:\\.("+c[u.XRANGEIDENTIFIERLOOSE]+")(?:"+c[u.PRERELEASELOOSE]+")?"+c[u.BUILD]+"?)?)?",d("XRANGE"),c[u.XRANGE]="^"+c[u.GTLT]+"\\s*"+c[u.XRANGEPLAIN]+"$",d("XRANGELOOSE"),c[u.XRANGELOOSE]="^"+c[u.GTLT]+"\\s*"+c[u.XRANGEPLAINLOOSE]+"$",d("COERCE"),c[u.COERCE]="(^|[^\\d])(\\d{1,16})(?:\\.(\\d{1,16}))?(?:\\.(\\d{1,16}))?(?:$|[^\\d])",d("COERCERTL"),i[u.COERCERTL]=new RegExp(c[u.COERCE],"g"),a[u.COERCERTL]=new RegExp(p(c[u.COERCE]),"g"),d("LONETILDE"),c[u.LONETILDE]="(?:~>?)",d("TILDETRIM"),c[u.TILDETRIM]="(\\s*)"+c[u.LONETILDE]+"\\s+",i[u.TILDETRIM]=new RegExp(c[u.TILDETRIM],"g"),a[u.TILDETRIM]=new RegExp(p(c[u.TILDETRIM]),"g")
d("TILDE"),c[u.TILDE]="^"+c[u.LONETILDE]+c[u.XRANGEPLAIN]+"$",d("TILDELOOSE"),c[u.TILDELOOSE]="^"+c[u.LONETILDE]+c[u.XRANGEPLAINLOOSE]+"$",d("LONECARET"),c[u.LONECARET]="(?:\\^)",d("CARETTRIM"),c[u.CARETTRIM]="(\\s*)"+c[u.LONECARET]+"\\s+",i[u.CARETTRIM]=new RegExp(c[u.CARETTRIM],"g"),a[u.CARETTRIM]=new RegExp(p(c[u.CARETTRIM]),"g")
d("CARET"),c[u.CARET]="^"+c[u.LONECARET]+c[u.XRANGEPLAIN]+"$",d("CARETLOOSE"),c[u.CARETLOOSE]="^"+c[u.LONECARET]+c[u.XRANGEPLAINLOOSE]+"$",d("COMPARATORLOOSE"),c[u.COMPARATORLOOSE]="^"+c[u.GTLT]+"\\s*("+c[u.LOOSEPLAIN]+")$|^$",d("COMPARATOR"),c[u.COMPARATOR]="^"+c[u.GTLT]+"\\s*("+c[u.FULLPLAIN]+")$|^$",d("COMPARATORTRIM"),c[u.COMPARATORTRIM]="(\\s*)"+c[u.GTLT]+"\\s*("+c[u.LOOSEPLAIN]+"|"+c[u.XRANGEPLAIN]+")",i[u.COMPARATORTRIM]=new RegExp(c[u.COMPARATORTRIM],"g"),a[u.COMPARATORTRIM]=new RegExp(p(c[u.COMPARATORTRIM]),"g")
d("HYPHENRANGE"),c[u.HYPHENRANGE]="^\\s*("+c[u.XRANGEPLAIN]+")\\s+-\\s+("+c[u.XRANGEPLAIN]+")\\s*$",d("HYPHENRANGELOOSE"),c[u.HYPHENRANGELOOSE]="^\\s*("+c[u.XRANGEPLAINLOOSE]+")\\s+-\\s+("+c[u.XRANGEPLAINLOOSE]+")\\s*$",d("STAR"),c[u.STAR]="(<|>)?=?\\s*\\*"
for(var m=0;m<l;m++)r(m,c[m]),i[m]||(i[m]=new RegExp(c[m]),a[m]=new RegExp(p(c[m])))
function g(e,t){if(t&&"object"==typeof t||(t={loose:!!t,includePrerelease:!1}),e instanceof v)return e
if("string"!=typeof e)return null
if(e.length>n)return null
if(!(t.loose?a[u.LOOSE]:a[u.FULL]).test(e))return null
try{return new v(e,t)}catch(e){return null}}function v(e,t){if(t&&"object"==typeof t||(t={loose:!!t,includePrerelease:!1}),e instanceof v){if(e.loose===t.loose)return e
e=e.version}else if("string"!=typeof e)throw new TypeError("Invalid Version: "+e)
if(e.length>n)throw new TypeError("version is longer than "+n+" characters")
if(!(this instanceof v))return new v(e,t)
r("SemVer",e,t),this.options=t,this.loose=!!t.loose
var o=e.trim().match(t.loose?a[u.LOOSE]:a[u.FULL])
if(!o)throw new TypeError("Invalid Version: "+e)
if(this.raw=e,this.major=+o[1],this.minor=+o[2],this.patch=+o[3],this.major>s||this.major<0)throw new TypeError("Invalid major version")
if(this.minor>s||this.minor<0)throw new TypeError("Invalid minor version")
if(this.patch>s||this.patch<0)throw new TypeError("Invalid patch version")
o[4]?this.prerelease=o[4].split(".").map((function(e){if(/^[0-9]+$/.test(e)){var t=+e
if(t>=0&&t<s)return t}return e})):this.prerelease=[],this.build=o[5]?o[5].split("."):[],this.format()}t.parse=g,t.valid=function(e,t){var r=g(e,t)
return r?r.version:null},t.clean=function(e,t){var r=g(e.trim().replace(/^[=v]+/,""),t)
return r?r.version:null},t.SemVer=v,v.prototype.format=function(){return this.version=this.major+"."+this.minor+"."+this.patch,this.prerelease.length&&(this.version+="-"+this.prerelease.join(".")),this.version},v.prototype.toString=function(){return this.version},v.prototype.compare=function(e){return r("SemVer.compare",this.version,this.options,e),e instanceof v||(e=new v(e,this.options)),this.compareMain(e)||this.comparePre(e)},v.prototype.compareMain=function(e){return e instanceof v||(e=new v(e,this.options)),w(this.major,e.major)||w(this.minor,e.minor)||w(this.patch,e.patch)},v.prototype.comparePre=function(e){if(e instanceof v||(e=new v(e,this.options)),this.prerelease.length&&!e.prerelease.length)return-1
if(!this.prerelease.length&&e.prerelease.length)return 1
if(!this.prerelease.length&&!e.prerelease.length)return 0
var t=0
do{var n=this.prerelease[t],s=e.prerelease[t]
if(r("prerelease compare",t,n,s),void 0===n&&void 0===s)return 0
if(void 0===s)return 1
if(void 0===n)return-1
if(n!==s)return w(n,s)}while(++t)},v.prototype.compareBuild=function(e){e instanceof v||(e=new v(e,this.options))
var t=0
do{var n=this.build[t],s=e.build[t]
if(r("prerelease compare",t,n,s),void 0===n&&void 0===s)return 0
if(void 0===s)return 1
if(void 0===n)return-1
if(n!==s)return w(n,s)}while(++t)},v.prototype.inc=function(e,t){switch(e){case"premajor":this.prerelease.length=0,this.patch=0,this.minor=0,this.major++,this.inc("pre",t)
break
case"preminor":this.prerelease.length=0,this.patch=0,this.minor++,this.inc("pre",t)
break
case"prepatch":this.prerelease.length=0,this.inc("patch",t),this.inc("pre",t)
break
case"prerelease":0===this.prerelease.length&&this.inc("patch",t),this.inc("pre",t)
break
case"major":0===this.minor&&0===this.patch&&0!==this.prerelease.length||this.major++,this.minor=0,this.patch=0,this.prerelease=[]
break
case"minor":0===this.patch&&0!==this.prerelease.length||this.minor++,this.patch=0,this.prerelease=[]
break
case"patch":0===this.prerelease.length&&this.patch++,this.prerelease=[]
break
case"pre":if(0===this.prerelease.length)this.prerelease=[0]
else{for(var r=this.prerelease.length;--r>=0;)"number"==typeof this.prerelease[r]&&(this.prerelease[r]++,r=-2);-1===r&&this.prerelease.push(0)}t&&(this.prerelease[0]===t?isNaN(this.prerelease[1])&&(this.prerelease=[t,0]):this.prerelease=[t,0])
break
default:throw new Error("invalid increment argument: "+e)}return this.format(),this.raw=this.version,this},t.inc=function(e,t,r,n){"string"==typeof r&&(n=r,r=void 0)
try{return new v(e,r).inc(t,n).version}catch(e){return null}},t.diff=function(e,t){if(_(e,t))return null
var r=g(e),n=g(t),s=""
if(r.prerelease.length||n.prerelease.length){s="pre"
var o="prerelease"}for(var i in r)if(("major"===i||"minor"===i||"patch"===i)&&r[i]!==n[i])return s+i
return o},t.compareIdentifiers=w
var y=/^[0-9]+$/
function w(e,t){var r=y.test(e),n=y.test(t)
return r&&n&&(e=+e,t=+t),e===t?0:r&&!n?-1:n&&!r?1:e<t?-1:1}function E(e,t,r){return new v(e,r).compare(new v(t,r))}function b(e,t,r){return E(e,t,r)>0}function O(e,t,r){return E(e,t,r)<0}function _(e,t,r){return 0===E(e,t,r)}function T(e,t,r){return 0!==E(e,t,r)}function R(e,t,r){return E(e,t,r)>=0}function C(e,t,r){return E(e,t,r)<=0}function S(e,t,r,n){switch(t){case"===":return"object"==typeof e&&(e=e.version),"object"==typeof r&&(r=r.version),e===r
case"!==":return"object"==typeof e&&(e=e.version),"object"==typeof r&&(r=r.version),e!==r
case"":case"=":case"==":return _(e,r,n)
case"!=":return T(e,r,n)
case">":return b(e,r,n)
case">=":return R(e,r,n)
case"<":return O(e,r,n)
case"<=":return C(e,r,n)
default:throw new TypeError("Invalid operator: "+t)}}function k(e,t){if(t&&"object"==typeof t||(t={loose:!!t,includePrerelease:!1}),e instanceof k){if(e.loose===!!t.loose)return e
e=e.value}if(!(this instanceof k))return new k(e,t)
e=e.trim().split(/\s+/).join(" "),r("comparator",e,t),this.options=t,this.loose=!!t.loose,this.parse(e),this.semver===x?this.value="":this.value=this.operator+this.semver.version,r("comp",this)}t.rcompareIdentifiers=function(e,t){return w(t,e)},t.major=function(e,t){return new v(e,t).major},t.minor=function(e,t){return new v(e,t).minor},t.patch=function(e,t){return new v(e,t).patch},t.compare=E,t.compareLoose=function(e,t){return E(e,t,!0)},t.compareBuild=function(e,t,r){var n=new v(e,r),s=new v(t,r)
return n.compare(s)||n.compareBuild(s)},t.rcompare=function(e,t,r){return E(t,e,r)},t.sort=function(e,r){return e.sort((function(e,n){return t.compareBuild(e,n,r)}))},t.rsort=function(e,r){return e.sort((function(e,n){return t.compareBuild(n,e,r)}))},t.gt=b,t.lt=O,t.eq=_,t.neq=T,t.gte=R,t.lte=C,t.cmp=S,t.Comparator=k
var x={}
function A(e,t){if(t&&"object"==typeof t||(t={loose:!!t,includePrerelease:!1}),e instanceof A)return e.loose===!!t.loose&&e.includePrerelease===!!t.includePrerelease?e:new A(e.raw,t)
if(e instanceof k)return new A(e.value,t)
if(!(this instanceof A))return new A(e,t)
if(this.options=t,this.loose=!!t.loose,this.includePrerelease=!!t.includePrerelease,this.raw=e.trim().split(/\s+/).join(" "),this.set=this.raw.split("||").map((function(e){return this.parseRange(e.trim())}),this).filter((function(e){return e.length})),!this.set.length)throw new TypeError("Invalid SemVer Range: "+this.raw)
this.format()}function I(e,t){for(var r=!0,n=e.slice(),s=n.pop();r&&n.length;)r=n.every((function(e){return s.intersects(e,t)})),s=n.pop()
return r}function P(e){return!e||"x"===e.toLowerCase()||"*"===e}function L(e,t,r,n,s,o,i,a,c,u,l,d,f){return((t=P(r)?"":P(n)?">="+r+".0.0":P(s)?">="+r+"."+n+".0":">="+t)+" "+(a=P(c)?"":P(u)?"<"+(+c+1)+".0.0":P(l)?"<"+c+"."+(+u+1)+".0":d?"<="+c+"."+u+"."+l+"-"+d:"<="+a)).trim()}function N(e,t,n){for(var s=0;s<e.length;s++)if(!e[s].test(t))return!1
if(t.prerelease.length&&!n.includePrerelease){for(s=0;s<e.length;s++)if(r(e[s].semver),e[s].semver!==x&&e[s].semver.prerelease.length>0){var o=e[s].semver
if(o.major===t.major&&o.minor===t.minor&&o.patch===t.patch)return!0}return!1}return!0}function $(e,t,r){try{t=new A(t,r)}catch(e){return!1}return t.test(e)}function M(e,t,r,n){var s,o,i,a,c
switch(e=new v(e,n),t=new A(t,n),r){case">":s=b,o=C,i=O,a=">",c=">="
break
case"<":s=O,o=R,i=b,a="<",c="<="
break
default:throw new TypeError('Must provide a hilo val of "<" or ">"')}if($(e,t,n))return!1
for(var u=0;u<t.set.length;++u){var l=t.set[u],d=null,f=null
if(l.forEach((function(e){e.semver===x&&(e=new k(">=0.0.0")),d=d||e,f=f||e,s(e.semver,d.semver,n)?d=e:i(e.semver,f.semver,n)&&(f=e)})),d.operator===a||d.operator===c)return!1
if((!f.operator||f.operator===a)&&o(e,f.semver))return!1
if(f.operator===c&&i(e,f.semver))return!1}return!0}k.prototype.parse=function(e){var t=this.options.loose?a[u.COMPARATORLOOSE]:a[u.COMPARATOR],r=e.match(t)
if(!r)throw new TypeError("Invalid comparator: "+e)
this.operator=void 0!==r[1]?r[1]:"","="===this.operator&&(this.operator=""),r[2]?this.semver=new v(r[2],this.options.loose):this.semver=x},k.prototype.toString=function(){return this.value},k.prototype.test=function(e){if(r("Comparator.test",e,this.options.loose),this.semver===x||e===x)return!0
if("string"==typeof e)try{e=new v(e,this.options)}catch(e){return!1}return S(e,this.operator,this.semver,this.options)},k.prototype.intersects=function(e,t){if(!(e instanceof k))throw new TypeError("a Comparator is required")
var r
if(t&&"object"==typeof t||(t={loose:!!t,includePrerelease:!1}),""===this.operator)return""===this.value||(r=new A(e.value,t),$(this.value,r,t))
if(""===e.operator)return""===e.value||(r=new A(this.value,t),$(e.semver,r,t))
var n=!(">="!==this.operator&&">"!==this.operator||">="!==e.operator&&">"!==e.operator),s=!("<="!==this.operator&&"<"!==this.operator||"<="!==e.operator&&"<"!==e.operator),o=this.semver.version===e.semver.version,i=!(">="!==this.operator&&"<="!==this.operator||">="!==e.operator&&"<="!==e.operator),a=S(this.semver,"<",e.semver,t)&&(">="===this.operator||">"===this.operator)&&("<="===e.operator||"<"===e.operator),c=S(this.semver,">",e.semver,t)&&("<="===this.operator||"<"===this.operator)&&(">="===e.operator||">"===e.operator)
return n||s||o&&i||a||c},t.Range=A,A.prototype.format=function(){return this.range=this.set.map((function(e){return e.join(" ").trim()})).join("||").trim(),this.range},A.prototype.toString=function(){return this.range},A.prototype.parseRange=function(e){var t=this.options.loose,n=t?a[u.HYPHENRANGELOOSE]:a[u.HYPHENRANGE]
e=e.replace(n,L),r("hyphen replace",e),e=e.replace(a[u.COMPARATORTRIM],"$1$2$3"),r("comparator trim",e,a[u.COMPARATORTRIM]),e=(e=(e=e.replace(a[u.TILDETRIM],"$1~")).replace(a[u.CARETTRIM],"$1^")).split(/\s+/).join(" ")
var s=t?a[u.COMPARATORLOOSE]:a[u.COMPARATOR],o=e.split(" ").map((function(e){return function(e,t){return r("comp",e,t),e=function(e,t){return e.trim().split(/\s+/).map((function(e){return function(e,t){r("caret",e,t)
var n=t.loose?a[u.CARETLOOSE]:a[u.CARET]
return e.replace(n,(function(t,n,s,o,i){var a
return r("caret",e,t,n,s,o,i),P(n)?a="":P(s)?a=">="+n+".0.0 <"+(+n+1)+".0.0":P(o)?a="0"===n?">="+n+"."+s+".0 <"+n+"."+(+s+1)+".0":">="+n+"."+s+".0 <"+(+n+1)+".0.0":i?(r("replaceCaret pr",i),a="0"===n?"0"===s?">="+n+"."+s+"."+o+"-"+i+" <"+n+"."+s+"."+(+o+1):">="+n+"."+s+"."+o+"-"+i+" <"+n+"."+(+s+1)+".0":">="+n+"."+s+"."+o+"-"+i+" <"+(+n+1)+".0.0"):(r("no pr"),a="0"===n?"0"===s?">="+n+"."+s+"."+o+" <"+n+"."+s+"."+(+o+1):">="+n+"."+s+"."+o+" <"+n+"."+(+s+1)+".0":">="+n+"."+s+"."+o+" <"+(+n+1)+".0.0"),r("caret return",a),a}))}(e,t)})).join(" ")}(e,t),r("caret",e),e=function(e,t){return e.trim().split(/\s+/).map((function(e){return function(e,t){var n=t.loose?a[u.TILDELOOSE]:a[u.TILDE]
return e.replace(n,(function(t,n,s,o,i){var a
return r("tilde",e,t,n,s,o,i),P(n)?a="":P(s)?a=">="+n+".0.0 <"+(+n+1)+".0.0":P(o)?a=">="+n+"."+s+".0 <"+n+"."+(+s+1)+".0":i?(r("replaceTilde pr",i),a=">="+n+"."+s+"."+o+"-"+i+" <"+n+"."+(+s+1)+".0"):a=">="+n+"."+s+"."+o+" <"+n+"."+(+s+1)+".0",r("tilde return",a),a}))}(e,t)})).join(" ")}(e,t),r("tildes",e),e=function(e,t){return r("replaceXRanges",e,t),e.split(/\s+/).map((function(e){return function(e,t){e=e.trim()
var n=t.loose?a[u.XRANGELOOSE]:a[u.XRANGE]
return e.replace(n,(function(n,s,o,i,a,c){r("xRange",e,n,s,o,i,a,c)
var u=P(o),l=u||P(i),d=l||P(a),f=d
return"="===s&&f&&(s=""),c=t.includePrerelease?"-0":"",u?n=">"===s||"<"===s?"<0.0.0-0":"*":s&&f?(l&&(i=0),a=0,">"===s?(s=">=",l?(o=+o+1,i=0,a=0):(i=+i+1,a=0)):"<="===s&&(s="<",l?o=+o+1:i=+i+1),n=s+o+"."+i+"."+a+c):l?n=">="+o+".0.0"+c+" <"+(+o+1)+".0.0"+c:d&&(n=">="+o+"."+i+".0"+c+" <"+o+"."+(+i+1)+".0"+c),r("xRange return",n),n}))}(e,t)})).join(" ")}(e,t),r("xrange",e),e=function(e,t){return r("replaceStars",e,t),e.trim().replace(a[u.STAR],"")}(e,t),r("stars",e),e}(e,this.options)}),this).join(" ").split(/\s+/)
return this.options.loose&&(o=o.filter((function(e){return!!e.match(s)}))),o=o.map((function(e){return new k(e,this.options)}),this)},A.prototype.intersects=function(e,t){if(!(e instanceof A))throw new TypeError("a Range is required")
return this.set.some((function(r){return I(r,t)&&e.set.some((function(e){return I(e,t)&&r.every((function(r){return e.every((function(e){return r.intersects(e,t)}))}))}))}))},t.toComparators=function(e,t){return new A(e,t).set.map((function(e){return e.map((function(e){return e.value})).join(" ").trim().split(" ")}))},A.prototype.test=function(e){if(!e)return!1
if("string"==typeof e)try{e=new v(e,this.options)}catch(e){return!1}for(var t=0;t<this.set.length;t++)if(N(this.set[t],e,this.options))return!0
return!1},t.satisfies=$,t.maxSatisfying=function(e,t,r){var n=null,s=null
try{var o=new A(t,r)}catch(e){return null}return e.forEach((function(e){o.test(e)&&(n&&-1!==s.compare(e)||(s=new v(n=e,r)))})),n},t.minSatisfying=function(e,t,r){var n=null,s=null
try{var o=new A(t,r)}catch(e){return null}return e.forEach((function(e){o.test(e)&&(n&&1!==s.compare(e)||(s=new v(n=e,r)))})),n},t.minVersion=function(e,t){e=new A(e,t)
var r=new v("0.0.0")
if(e.test(r))return r
if(r=new v("0.0.0-0"),e.test(r))return r
r=null
for(var n=0;n<e.set.length;++n){e.set[n].forEach((function(e){var t=new v(e.semver.version)
switch(e.operator){case">":0===t.prerelease.length?t.patch++:t.prerelease.push(0),t.raw=t.format()
case"":case">=":r&&!b(r,t)||(r=t)
break
case"<":case"<=":break
default:throw new Error("Unexpected operation: "+e.operator)}}))}if(r&&e.test(r))return r
return null},t.validRange=function(e,t){try{return new A(e,t).range||"*"}catch(e){return null}},t.ltr=function(e,t,r){return M(e,t,"<",r)},t.gtr=function(e,t,r){return M(e,t,">",r)},t.outside=M,t.prerelease=function(e,t){var r=g(e,t)
return r&&r.prerelease.length?r.prerelease:null},t.intersects=function(e,t,r){return e=new A(e,r),t=new A(t,r),e.intersects(t)},t.coerce=function(e,t){if(e instanceof v)return e
"number"==typeof e&&(e=String(e))
if("string"!=typeof e)return null
var r=null
if((t=t||{}).rtl){for(var n;(n=a[u.COERCERTL].exec(e))&&(!r||r.index+r[0].length!==e.length);)r&&n.index+n[0].length===r.index+r[0].length||(r=n),a[u.COERCERTL].lastIndex=n.index+n[1].length+n[2].length
a[u.COERCERTL].lastIndex=-1}else r=e.match(a[u.COERCE])
if(null===r)return null
return g(r[2]+"."+(r[3]||"0")+"."+(r[4]||"0"),t)}},6998:(e,t,r)=>{var n,s,o,i=Object.create,a=Object.defineProperty,c=Object.defineProperties,u=Object.getOwnPropertyDescriptor,l=Object.getOwnPropertyDescriptors,d=Object.getOwnPropertyNames,f=Object.getOwnPropertySymbols,h=Object.getPrototypeOf,p=Object.prototype.hasOwnProperty,m=Object.prototype.propertyIsEnumerable,g=(e,t,r)=>t in e?a(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,v=(e,t)=>{for(var r in t||(t={}))p.call(t,r)&&g(e,r,t[r])
if(f)for(var r of f(t))m.call(t,r)&&g(e,r,t[r])
return e},y=(e,t)=>c(e,l(t)),w=e=>a(e,"__esModule",{value:!0}),E=(e,t)=>function(){return e&&(t=(0,e[d(e)[0]])(e=0)),t},b=(e,t)=>{for(var r in t)a(e,r,{get:t[r],enumerable:!0})},O=(e,t,r,n)=>{if(t&&"object"==typeof t||"function"==typeof t)for(let s of d(t))p.call(e,s)||!r&&"default"===s||a(e,s,{get:()=>t[s],enumerable:!(n=u(t,s))||n.enumerable})
return e},_=(e=>(t,r)=>e&&e.get(t)||(r=O(w({}),t,1),e&&e.set(t,r),r))("undefined"!=typeof WeakMap?new WeakMap:0),T=(e,t,r)=>new Promise(((n,s)=>{var o=e=>{try{a(r.next(e))}catch(e){s(e)}},i=e=>{try{a(r.throw(e))}catch(e){s(e)}},a=e=>e.done?n(e.value):Promise.resolve(e.value).then(o,i)
a((r=r.apply(e,t)).next())})),R=E({"src/lib/errors/git-error.ts"(){n=class extends Error{constructor(e,t){super(t),this.task=e,Object.setPrototypeOf(this,new.target.prototype)}}}}),C=E({"src/lib/errors/git-response-error.ts"(){R(),s=class extends n{constructor(e,t){super(void 0,t||String(e)),this.git=e}}}})
function S(...e){const t=new String(e)
return o.set(t,e),t}function k(e){return e instanceof String&&o.has(e)}function x(e){return o.get(e)||[]}var A,I,P,L,N,$,M,j=E({"src/lib/args/pathspec.ts"(){o=new WeakMap}}),D=E({"src/lib/errors/git-construct-error.ts"(){R(),A=class extends n{constructor(e,t){super(void 0,t),this.config=e}}}}),F=E({"src/lib/errors/git-plugin-error.ts"(){R(),I=class extends n{constructor(e,t,r){super(e,r),this.task=e,this.plugin=t,Object.setPrototypeOf(this,new.target.prototype)}}}}),U=E({"src/lib/errors/task-configuration-error.ts"(){R(),P=class extends n{constructor(e){super(void 0,e)}}}})
function q(e){return"function"==typeof e?e:$}function B(e){return"function"==typeof e&&e!==$}function G(e,t){const r=e.indexOf(t)
return r<=0?[e,""]:[e.substr(0,r),e.substr(r+1)]}function H(e,t=0){return W(e)&&e.length>t?e[t]:void 0}function V(e,t=0){if(W(e)&&e.length>t)return e[e.length-1-t]}function W(e){return!(!e||"number"!=typeof e.length)}function z(e="",t=!0,r="\n"){return e.split(r).reduce(((e,r)=>{const n=t?r.trim():r
return n&&e.push(n),e}),[])}function X(e,t){return z(e,!0).map((e=>t(e)))}function Y(e){return(0,L.exists)(e,L.FOLDER)}function K(e,t){return Array.isArray(e)?e.includes(t)||e.push(t):e.add(t),t}function J(e,t){return Array.isArray(e)&&!e.includes(t)&&e.push(t),e}function Q(e,t){if(Array.isArray(e)){const r=e.indexOf(t)
r>=0&&e.splice(r,1)}else e.delete(t)
return t}function Z(e){return Array.isArray(e)?e:[e]}function ee(e){return Z(e).map(String)}function te(e,t=0){if(null==e)return t
const r=parseInt(e,10)
return isNaN(r)?t:r}function re(e,t){const r=[]
for(let n=0,s=e.length;n<s;n++)r.push(t,e[n])
return r}function ne(e){return(Array.isArray(e)?Buffer.concat(e):e).toString("utf-8")}function se(e,t){return Object.assign({},...t.map((t=>t in e?{[t]:e[t]}:{})))}function oe(e=0){return new Promise((t=>setTimeout(t,e)))}var ie,ae,ce,ue,le,de=E({"src/lib/utils/util.ts"(){L=r(1513),N="\0",$=()=>{},M=Object.prototype.toString.call.bind(Object.prototype.toString)}})
function fe(e,t,r){return t(e)?e:arguments.length>2?r:void 0}function he(e,t){const r=k(e)?"string":typeof e
return/number|string|boolean/.test(r)&&(!t||!t.includes(r))}function pe(e){return!!e&&"[object Object]"===M(e)}function me(e){return"function"==typeof e}var ge,ve,ye,we,Ee,be=E({"src/lib/utils/argument-filters.ts"(){de(),j(),ie=e=>Array.isArray(e),ae=e=>"string"==typeof e,ce=e=>Array.isArray(e)&&e.every(ae),ue=e=>ae(e)||Array.isArray(e)&&e.every(ae),le=e=>null!=e&&!"number|boolean|function".includes(typeof e)&&(Array.isArray(e)||"string"==typeof e||"number"==typeof e.length)}}),Oe=E({"src/lib/utils/exit-codes.ts"(){ge=(e=>(e[e.SUCCESS=0]="SUCCESS",e[e.ERROR=1]="ERROR",e[e.NOT_FOUND=-2]="NOT_FOUND",e[e.UNCLEAN=128]="UNCLEAN",e))(ge||{})}}),_e=E({"src/lib/utils/git-output-streams.ts"(){ve=class{constructor(e,t){this.stdOut=e,this.stdErr=t}asStrings(){return new ve(this.stdOut.toString("utf8"),this.stdErr.toString("utf8"))}}}}),Te=E({"src/lib/utils/line-parser.ts"(){ye=class{constructor(e,t){this.matches=[],this.parse=(e,t)=>(this.resetMatches(),!!this._regExp.every(((t,r)=>this.addMatch(t,r,e(r))))&&!1!==this.useMatches(t,this.prepareMatches())),this._regExp=Array.isArray(e)?e:[e],t&&(this.useMatches=t)}useMatches(e,t){throw new Error("LineParser:useMatches not implemented")}resetMatches(){this.matches.length=0}prepareMatches(){return this.matches}addMatch(e,t,r){const n=r&&e.exec(r)
return n&&this.pushMatch(t,n),!!n}pushMatch(e,t){this.matches.push(...t.slice(1))}},we=class extends ye{addMatch(e,t,r){return/^remote:\s/.test(String(r))&&super.addMatch(e,t,r)}pushMatch(e,t){(e>0||t.length>1)&&super.pushMatch(e,t)}}}})
function Re(...e){const t=process.cwd(),r=Object.assign(v({baseDir:t},Ee),...e.filter((e=>"object"==typeof e&&e)))
return r.baseDir=r.baseDir||t,r.trimmed=!0===r.trimmed,r}var Ce=E({"src/lib/utils/simple-git-options.ts"(){Ee={binary:"git",maxConcurrentProcesses:5,config:[],trimmed:!1}}})
function Se(e,t=[]){return pe(e)?Object.keys(e).reduce(((t,r)=>{const n=e[r]
return k(n)?t.push(n):he(n,["boolean"])?t.push(r+"="+n):t.push(r),t}),t):t}function ke(e,t=0,r=!1){const n=[]
for(let r=0,s=t<0?e.length:t;r<s;r++)"string|number".includes(typeof e[r])&&n.push(String(e[r]))
return Se(xe(e),n),r||n.push(...function(e){const t="function"==typeof V(e)
return fe(V(e,t?1:0),ie,[])}(e)),n}function xe(e){const t=me(V(e))
return fe(V(e,t?1:0),pe)}function Ae(e,t=!0){const r=q(V(e))
return t||B(r)?r:void 0}var Ie=E({"src/lib/utils/task-options.ts"(){be(),de(),j()}})
function Pe(e,t){return e(t.stdOut,t.stdErr)}function Le(e,t,r,n=!0){return Z(r).forEach((r=>{for(let s=z(r,n),o=0,i=s.length;o<i;o++){const r=(e=0)=>{if(!(o+e>=i))return s[o+e]}
t.some((({parse:t})=>t(r,e)))}})),e}var Ne=E({"src/lib/utils/task-parser.ts"(){de()}}),$e={}
b($e,{ExitCodes:()=>ge,GitOutputStreams:()=>ve,LineParser:()=>ye,NOOP:()=>$,NULL:()=>N,RemoteLineParser:()=>we,append:()=>K,appendTaskOptions:()=>Se,asArray:()=>Z,asFunction:()=>q,asNumber:()=>te,asStringArray:()=>ee,bufferToString:()=>ne,callTaskParser:()=>Pe,createInstanceConfig:()=>Re,delay:()=>oe,filterArray:()=>ie,filterFunction:()=>me,filterHasLength:()=>le,filterPlainObject:()=>pe,filterPrimitives:()=>he,filterString:()=>ae,filterStringArray:()=>ce,filterStringOrStringArray:()=>ue,filterType:()=>fe,first:()=>H,folderExists:()=>Y,forEachLineWithContent:()=>X,getTrailingOptions:()=>ke,including:()=>J,isUserFunction:()=>B,last:()=>V,objectToString:()=>M,parseStringResponse:()=>Le,pick:()=>se,prefixedArray:()=>re,remove:()=>Q,splitOn:()=>G,toLinesWithContent:()=>z,trailingFunctionArgument:()=>Ae,trailingOptionsArgument:()=>xe})
var Me,je,De,Fe=E({"src/lib/utils/index.ts"(){be(),Oe(),_e(),Te(),Ce(),Ie(),Ne(),de()}}),Ue={}
function qe(e){switch(e){case"bare":return Ge()
case"root":return Be()}return{commands:["rev-parse","--is-inside-work-tree"],format:"utf-8",onError:je,parser:De}}function Be(){return{commands:["rev-parse","--git-dir"],format:"utf-8",onError:je,parser:e=>/^\.(git)?$/.test(e.trim())}}function Ge(){return{commands:["rev-parse","--is-bare-repository"],format:"utf-8",onError:je,parser:De}}b(Ue,{CheckRepoActions:()=>Me,checkIsBareRepoTask:()=>Ge,checkIsRepoRootTask:()=>Be,checkIsRepoTask:()=>qe})
var He,Ve,We,ze,Xe=E({"src/lib/tasks/check-is-repo.ts"(){Fe(),Me=(e=>(e.BARE="bare",e.IN_TREE="tree",e.IS_REPO_ROOT="root",e))(Me||{}),je=({exitCode:e},t,r,n)=>{if(128===e&&function(e){return/(Not a git repository|Kein Git-Repository)/i.test(String(e))}(t))return r(Buffer.from("false"))
n(t)},De=e=>"true"===e.trim()}})
var Ye,Ke=E({"src/lib/responses/CleanSummary.ts"(){Fe(),He=class{constructor(e){this.dryRun=e,this.paths=[],this.files=[],this.folders=[]}},Ve=/^[a-z]+\s*/i,We=/^[a-z]+\s+[a-z]+\s*/i,ze=/\/$/}}),Je={}
function Qe(e){return{commands:Ye,format:"empty",parser:e}}function Ze(e){return{commands:Ye,format:"empty",parser(){throw"string"==typeof e?new P(e):e}}}function et(e,t=!1){return{commands:e,format:"utf-8",parser:e=>t?String(e).trim():e}}function tt(e){return{commands:e,format:"buffer",parser:e=>e}}function rt(e){return"buffer"===e.format}function nt(e){return"empty"===e.format||!e.commands.length}b(Je,{EMPTY_COMMANDS:()=>Ye,adhocExecTask:()=>Qe,configurationErrorTask:()=>Ze,isBufferTask:()=>rt,isEmptyTask:()=>nt,straightThroughBufferTask:()=>tt,straightThroughStringTask:()=>et})
var st,ot,it,at,ct,ut=E({"src/lib/tasks/task.ts"(){U(),Ye=[]}}),lt={}
function dt(e,t){const{cleanMode:r,options:n,valid:s}=function(e){let t,r=[],n={cleanMode:!1,options:!0}
return e.replace(/[^a-z]i/g,"").split("").forEach((e=>{var s
!function(e){return"f"===e||"n"===e}(e)?n.options=n.options&&(s=r[r.length]=`-${e}`,/^-[a-z]$/i.test(s)&&ct.has(s.charAt(1))):(t=e,n.cleanMode=!0)})),{cleanMode:t,options:r,valid:n}}(e)
return r?s.options?(n.push(...t),n.some(pt)?Ze(st):ft(r,n)):Ze(it+JSON.stringify(e)):Ze(ot)}function ft(e,t){return{commands:["clean",`-${e}`,...t],format:"utf-8",parser:t=>function(e,t){const r=new He(e),n=e?We:Ve
return z(t).forEach((e=>{const t=e.replace(n,"")
r.paths.push(t),(ze.test(t)?r.folders:r.files).push(t)})),r}("n"===e,t)}}function ht(e){return Array.isArray(e)&&e.every((e=>ct.has(e)))}function pt(e){return/^-[^\-]/.test(e)?e.indexOf("i")>0:"--interactive"===e}b(lt,{CONFIG_ERROR_INTERACTIVE_MODE:()=>st,CONFIG_ERROR_MODE_REQUIRED:()=>ot,CONFIG_ERROR_UNKNOWN_OPTION:()=>it,CleanOptions:()=>at,cleanTask:()=>ft,cleanWithOptionsTask:()=>dt,isCleanOptionsArray:()=>ht})
var mt,gt=E({"src/lib/tasks/clean.ts"(){Ke(),Fe(),ut(),st="Git clean interactive mode is not supported",ot='Git clean mode parameter ("n" or "f") is required',it="Git clean unknown option found in: ",at=(e=>(e.DRY_RUN="n",e.FORCE="f",e.IGNORED_INCLUDED="x",e.IGNORED_ONLY="X",e.EXCLUDING="e",e.QUIET="q",e.RECURSIVE="d",e))(at||{}),ct=new Set(["i",...ee(Object.values(at))])}})
function*vt(e,t=null){const r=e.split("\0")
for(let e=0,n=r.length-1;e<n;){const n=r[e++].replace(/^(file):/,"")
let s=r[e++],o=t
if(s.includes("\n")){const e=G(s,"\n")
o=e[0],s=e[1]}yield{file:n,key:o,value:s}}}var yt,wt=E({"src/lib/responses/ConfigList.ts"(){Fe(),mt=class{constructor(){this.files=[],this.values=Object.create(null)}get all(){return this._all||(this._all=this.files.reduce(((e,t)=>Object.assign(e,this.values[t])),{})),this._all}addFile(e){if(!(e in this.values)){const t=V(this.files)
this.values[e]=t?Object.create(this.values[t]):{},this.files.push(e)}return this.values[e]}addValue(e,t,r){const n=this.addFile(e)
n.hasOwnProperty(t)?Array.isArray(n[t])?n[t].push(r):n[t]=[n[t],r]:n[t]=r,this._all=void 0}}}})
function Et(e,t){return"string"==typeof e&&yt.hasOwnProperty(e)?e:t}function bt(e,t){const r=["config","--null","--show-origin","--get-all",e]
return t&&r.splice(1,0,`--${t}`),{commands:r,format:"utf-8",parser:t=>function(e,t){let r=null
const n=[],s=new Map
for(const o of vt(e,t))o.key===t&&(n.push(r=o.value),s.has(o.file)||s.set(o.file,[]),s.get(o.file).push(r))
return{key:t,paths:Array.from(s.keys()),scopes:s,value:r,values:n}}(t,e)}}function Ot(e){const t=["config","--list","--show-origin","--null"]
return e&&t.push(`--${e}`),{commands:t,format:"utf-8",parser:e=>function(e){const t=new mt
for(const r of vt(e))t.addValue(r.file,String(r.key),r.value)
return t}(e)}}var _t,Tt,Rt,Ct,St=E({"src/lib/tasks/config.ts"(){wt(),Fe(),yt=(e=>(e.system="system",e.global="global",e.local="local",e.worktree="worktree",e))(yt||{})}})
function kt(...e){return(new Ct).param(...e)}function xt(){return{grep(e){const t=Ae(arguments),r=ke(arguments)
for(const e of _t)if(r.includes(e))return this._runTask(Ze(`git.grep: use of "${e}" is not supported.`),t)
"string"==typeof e&&(e=kt().param(e))
const n=["grep","--null","-n","--full-name",...r,...e]
return this._runTask({commands:n,format:"utf-8",parser:e=>function(e){const t=new Set,r={}
return X(e,(e=>{const[n,s,o]=e.split(N)
t.add(n),(r[n]=r[n]||[]).push({line:te(s),path:n,preview:o})})),{paths:t,results:r}}(e)},t)}}}var At,It,Pt=E({"src/lib/tasks/grep.ts"(){Fe(),ut(),_t=["-h"],Tt=Symbol("grepQuery"),Ct=class{constructor(){this[Rt]=[]}*[(Rt=Tt,Symbol.iterator)](){for(const e of this[Tt])yield e}and(...e){return e.length&&this[Tt].push("--and","(",...re(e,"-e"),")"),this}param(...e){return this[Tt].push(...re(e,"-e")),this}}}}),Lt={}
function Nt(e,t){const r=["reset"]
return Mt(e)&&r.push(`--${e}`),r.push(...t),et(r)}function $t(e){if(Mt(e))return e
switch(typeof e){case"string":case"undefined":return"soft"}}function Mt(e){return It.includes(e)}b(Lt,{ResetMode:()=>At,getResetMode:()=>$t,resetTask:()=>Nt})
var jt=E({"src/lib/tasks/reset.ts"(){ut(),At=(e=>(e.MIXED="mixed",e.SOFT="soft",e.HARD="hard",e.MERGE="merge",e.KEEP="keep",e))(At||{}),It=Array.from(Object.values(At))}}),Dt={}
b(Dt,{CheckRepoActions:()=>Me,CleanOptions:()=>at,GitConfigScope:()=>yt,GitConstructError:()=>A,GitError:()=>n,GitPluginError:()=>I,GitResponseError:()=>s,ResetMode:()=>At,TaskConfigurationError:()=>P,grepQueryBuilder:()=>kt,pathspec:()=>S})
var Ft=E({"src/lib/api.ts"(){j(),D(),R(),F(),C(),U(),Xe(),gt(),St(),Pt(),jt()}})
var Ut=E({"src/lib/plugins/abort-plugin.ts"(){F()}})
function qt({allowUnsafeProtocolOverride:e=!1,allowUnsafePack:t=!1}={}){return{type:"spawn.args",action:(r,n)=>(r.forEach(((s,o)=>{const i=o<r.length?r[o+1]:""
e||function(e,t){if(function(e){return"string"==typeof e&&"-c"===e.trim().toLowerCase()}(e)&&/^\s*protocol(.[a-z]+)?.allow/.test(t))throw new I(void 0,"unsafe","Configuring protocol.allow is not permitted without enabling allowUnsafeExtProtocol")}(s,i),t||function(e,t){if(/^\s*--(upload|receive)-pack/.test(e))throw new I(void 0,"unsafe","Use of --upload-pack or --receive-pack is not permitted without enabling allowUnsafePack")
if("clone"===t&&/^\s*-u\b/.test(e))throw new I(void 0,"unsafe","Use of clone with option -u is not permitted without enabling allowUnsafePack")
if("push"===t&&/^\s*--exec\b/.test(e))throw new I(void 0,"unsafe","Use of push with option --exec is not permitted without enabling allowUnsafePack")}(s,n.method)})),r)}}var Bt=E({"src/lib/plugins/block-unsafe-operations-plugin.ts"(){F()}})
var Gt,Ht,Vt=E({"src/lib/plugins/command-config-prefixing-plugin.ts"(){Fe()}})
function Wt({onClose:e=!0,onExit:t=50}={}){function r(e,t,r){!1!==e&&(!0===e?t.promise:t.promise.then((()=>oe(e)))).then(r.done)}return{type:"spawn.after",action(n,s){return T(this,arguments,(function*(n,{spawned:s,close:o}){var i,a
const c=function(){let n=-1
const s={close:(0,Gt.deferred)(),closeTimeout:(0,Gt.deferred)(),exit:(0,Gt.deferred)(),exitTimeout:(0,Gt.deferred)()},o=Promise.race([!1===e?Ht:s.closeTimeout.promise,!1===t?Ht:s.exitTimeout.promise])
return r(e,s.close,s.closeTimeout),r(t,s.exit,s.exitTimeout),{close(e){n=e,s.close.done()},exit(e){n=e,s.exit.done()},get exitCode(){return n},result:o}}()
let u=!0,l=()=>{u=!1}
null==(i=s.stdout)||i.on("data",l),null==(a=s.stderr)||a.on("data",l),s.on("error",l),s.on("close",(e=>c.close(e))),s.on("exit",(e=>c.exit(e)))
try{yield c.result,u&&(yield oe(50)),o(c.exitCode)}catch(e){o(c.exitCode,e)}}))}}}var zt=E({"src/lib/plugins/completion-detection.plugin.ts"(){Gt=r(2443),Fe(),Ht=(0,Gt.deferred)().promise}})
function Xt(e){return!(!e.exitCode||!e.stdErr.length)}function Yt(e){return Buffer.concat([...e.stdOut,...e.stdErr])}function Kt(e=!1,t=Xt,r=Yt){return(n,s)=>!e&&n||!t(s)?n:r(s)}function Jt(e){return{type:"task.error",action(t,r){const s=e(t.error,{stdErr:r.stdErr,stdOut:r.stdOut,exitCode:r.exitCode})
return Buffer.isBuffer(s)?{error:new n(void 0,s.toString("utf-8"))}:{error:s}}}}var Qt,Zt=E({"src/lib/plugins/error-detection.plugin.ts"(){R()}}),er=E({"src/lib/plugins/plugin-store.ts"(){Fe(),Qt=class{constructor(){this.plugins=new Set}add(e){const t=[]
return Z(e).forEach((e=>e&&this.plugins.add(K(t,e)))),()=>{t.forEach((e=>this.plugins.delete(e)))}}exec(e,t,r){let n=t
const s=Object.freeze(Object.create(r))
for(const t of this.plugins)t.type===e&&(n=t.action(n,s))
return n}}}})
var tr=E({"src/lib/plugins/progress-monitor-plugin.ts"(){Fe()}}),rr=E({"src/lib/plugins/simple-git-plugin.ts"(){}})
var nr=E({"src/lib/plugins/spawn-options-plugin.ts"(){Fe()}})
var sr=E({"src/lib/plugins/timout-plugin.ts"(){F()}}),or=E({"src/lib/plugins/index.ts"(){Ut(),Bt(),Vt(),zt(),Zt(),er(),tr(),rr(),nr(),sr()}})
var ir,ar=E({"src/lib/plugins/suffix-paths.plugin.ts"(){j()}})
function cr(e,t,r){return t&&String(t).replace(/\s*/,"")?(n,...s)=>{e(`%s ${n}`,t,...s),r&&r(n,...s)}:r?(t,...n)=>{e(t,...n),r(t,...n)}:e}function ur(e,t,r,n=function(){return(0,ir.default)("simple-git")}()){const s=e&&`[${e}]`||"",o=[],i="string"==typeof t?n.extend(t):t,a=function(e,t,{namespace:r}){if("string"==typeof e)return e
const n=t&&t.namespace||""
return n.startsWith(r)?n.substr(r.length+1):n||r}(fe(t,ae),i,n)
return function t(r){const o=r&&`[${r}]`||"",a=i&&cr(i,o)||$,u=cr(n,`${s} ${o}`,a)
return Object.assign(i?a:u,{label:e,sibling:c,info:u,step:t})}(r)
function c(t,r){return K(o,ur(e,a.replace(/^[^:]+/,t),r,n))}}var lr,dr,fr,hr,pr=E({"src/lib/git-logger.ts"(){var e,t
e=r(5158),ir=O(w(a(null!=e?i(h(e)):{},"default",!t&&e&&e.__esModule?{get:()=>e.default,enumerable:!0}:{value:e,enumerable:!0})),e),Fe(),ir.default.formatters.L=e=>String(le(e)?e.length:"-"),ir.default.formatters.B=e=>Buffer.isBuffer(e)?e.toString("utf8"):M(e)}}),mr=E({"src/lib/runners/tasks-pending-queue.ts"(){R(),pr(),(dr=lr=class{constructor(e="GitExecutor"){this.logLabel=e,this._queue=new Map}withProgress(e){return this._queue.get(e)}createProgress(e){const t=lr.getName(e.commands[0])
return{task:e,logger:ur(this.logLabel,t),name:t}}push(e){const t=this.createProgress(e)
return t.logger("Adding task to the queue, commands = %o",e.commands),this._queue.set(e,t),t}fatal(e){for(const[t,{logger:r}]of Array.from(this._queue.entries()))t===e.task?(r.info("Failed %o",e),r("Fatal exception, any as-yet un-started tasks run through this executor will not be attempted")):r.info("A fatal exception occurred in a previous task, the queue has been purged: %o",e.message),this.complete(t)
if(0!==this._queue.size)throw new Error(`Queue size should be zero after fatal: ${this._queue.size}`)}complete(e){this.withProgress(e)&&this._queue.delete(e)}attempt(e){const t=this.withProgress(e)
if(!t)throw new n(void 0,"TasksPendingQueue: attempt called for an unknown task")
return t.logger("Starting task"),t}static getName(e="empty"){return`task:${e}:${++lr.counter}`}}).counter=0}})
function gr(e,t){return{method:H(e.commands)||"",commands:t}}function vr(e,t,r,n){return s=>{r("%s received %L bytes",t,s),n("%B",s),e.push(s)}}var yr,wr=E({"src/lib/runners/git-executor-chain.ts"(){fr=r(2081),R(),ut(),Fe(),mr(),hr=class{constructor(e,t,r){this._executor=e,this._scheduler=t,this._plugins=r,this._chain=Promise.resolve(),this._queue=new dr}get binary(){return this._executor.binary}get cwd(){return this._cwd||this._executor.cwd}set cwd(e){this._cwd=e}get env(){return this._executor.env}get outputHandler(){return this._executor.outputHandler}chain(){return this}push(e){return this._queue.push(e),this._chain=this._chain.then((()=>this.attemptTask(e)))}attemptTask(e){return T(this,null,(function*(){const t=yield this._scheduler.next(),r=()=>this._queue.complete(e)
try{const{logger:t}=this._queue.attempt(e)
return yield nt(e)?this.attemptEmptyTask(e,t):this.attemptRemoteTask(e,t)}catch(t){throw this.onFatalException(e,t)}finally{r(),t()}}))}onFatalException(e,t){const r=t instanceof n?Object.assign(t,{task:e}):new n(e,t&&String(t))
return this._chain=Promise.resolve(),this._queue.fatal(r),r}attemptRemoteTask(e,t){return T(this,null,(function*(){const r=this._plugins.exec("spawn.args",[...e.commands],gr(e,e.commands)),n=yield this.gitResponse(e,this.binary,r,this.outputHandler,t.step("SPAWN")),s=yield this.handleTaskData(e,r,n,t.step("HANDLE"))
return t("passing response to task's parser as a %s",e.format),rt(e)?Pe(e.parser,s):Pe(e.parser,s.asStrings())}))}attemptEmptyTask(e,t){return T(this,null,(function*(){return t("empty task bypassing child process to call to task's parser"),e.parser(this)}))}handleTaskData(e,t,r,n){const{exitCode:s,rejection:o,stdOut:i,stdErr:a}=r
return new Promise(((c,u)=>{n("Preparing to handle process response exitCode=%d stdOut=",s)
const{error:l}=this._plugins.exec("task.error",{error:o},v(v({},gr(e,t)),r))
return l&&e.onError?(n.info("exitCode=%s handling with custom error handler"),e.onError(r,l,(e=>{n.info("custom error handler treated as success"),n("custom error returned a %s",M(e)),c(new ve(Array.isArray(e)?Buffer.concat(e):e,Buffer.concat(a)))}),u)):l?(n.info("handling as error: exitCode=%s stdErr=%s rejection=%o",s,a.length,o),u(l)):(n.info("retrieving task output complete"),void c(new ve(Buffer.concat(i),Buffer.concat(a))))}))}gitResponse(e,t,r,n,s){return T(this,null,(function*(){const o=s.sibling("output"),i=this._plugins.exec("spawn.options",{cwd:this.cwd,env:this.env,windowsHide:!0},gr(e,e.commands))
return new Promise((a=>{const c=[],u=[]
s.info("%s %o",t,r),s("%O",i)
let l=this._beforeSpawn(e,r)
if(l)return a({stdOut:c,stdErr:u,exitCode:9901,rejection:l})
this._plugins.exec("spawn.before",void 0,y(v({},gr(e,r)),{kill(e){l=e||l}}))
const d=(0,fr.spawn)(t,r,i)
d.stdout.on("data",vr(c,"stdOut",s,o.step("stdOut"))),d.stderr.on("data",vr(u,"stdErr",s,o.step("stdErr"))),d.on("error",function(e,t){return r=>{t("[ERROR] child process exception %o",r),e.push(Buffer.from(String(r.stack),"ascii"))}}(u,s)),n&&(s("Passing child process stdOut/stdErr to custom outputHandler"),n(t,d.stdout,d.stderr,[...r])),this._plugins.exec("spawn.after",void 0,y(v({},gr(e,r)),{spawned:d,close(e,t){a({stdOut:c,stdErr:u,exitCode:e,rejection:l||t})},kill(e){d.killed||(l=e,d.kill("SIGINT"))}}))}))}))}_beforeSpawn(e,t){let r
return this._plugins.exec("spawn.before",void 0,y(v({},gr(e,t)),{kill(e){r=e||r}})),r}}}}),Er={}
b(Er,{GitExecutor:()=>yr})
var br=E({"src/lib/runners/git-executor.ts"(){wr(),yr=class{constructor(e="git",t,r,n){this.binary=e,this.cwd=t,this._scheduler=r,this._plugins=n,this._chain=new hr(this,this._scheduler,this._plugins)}chain(){return new hr(this,this._scheduler,this._plugins)}push(e){return this._chain.push(e)}}}})
function Or(e,t,r=$){t.then((e=>{r(null,e)}),(t=>{(null==t?void 0:t.task)===e&&r(t instanceof s?function(e){let t=e=>{console.warn(`simple-git deprecation notice: accessing GitResponseError.${e} should be GitResponseError.git.${e}, this will no longer be available in version 3`),t=$}
return Object.create(e,Object.getOwnPropertyNames(e.git).reduce(r,{}))
function r(r,n){return n in e||(r[n]={enumerable:!1,configurable:!1,get:()=>(t(n),e.git[n])}),r}}(t):t,void 0)}))}var _r=E({"src/lib/task-callback.ts"(){C(),Fe()}})
function Tr(e,t){return Qe((r=>{if(!Y(e))throw new Error(`Git.cwd: cannot change to non-directory "${e}"`)
return(t||r).cwd=e}))}var Rr=E({"src/lib/tasks/change-working-directory.ts"(){Fe(),ut()}})
function Cr(e){const t=["checkout",...e]
return"-b"===t[1]&&t.includes("-B")&&(t[1]=Q(t,"-B")),et(t)}var Sr,kr=E({"src/lib/tasks/checkout.ts"(){Fe(),ut()}})
function xr(e){return Le({author:null,branch:"",commit:"",root:!1,summary:{changes:0,insertions:0,deletions:0}},Sr,e)}var Ar=E({"src/lib/parsers/parse-commit.ts"(){Fe(),Sr=[new ye(/^\[([^\s]+)( \([^)]+\))? ([^\]]+)/,((e,[t,r,n])=>{e.branch=t,e.commit=n,e.root=!!r})),new ye(/\s*Author:\s(.+)/i,((e,[t])=>{const r=t.split("<"),n=r.pop()
n&&n.includes("@")&&(e.author={email:n.substr(0,n.length-1),name:r.join("<").trim()})})),new ye(/(\d+)[^,]*(?:,\s*(\d+)[^,]*)(?:,\s*(\d+))/g,((e,[t,r,n])=>{e.summary.changes=parseInt(t,10)||0,e.summary.insertions=parseInt(r,10)||0,e.summary.deletions=parseInt(n,10)||0})),new ye(/^(\d+)[^,]*(?:,\s*(\d+)[^(]+\(([+-]))?/,((e,[t,r,n])=>{e.summary.changes=parseInt(t,10)||0
const s=parseInt(r,10)||0
"-"===n?e.summary.deletions=s:"+"===n&&(e.summary.insertions=s)}))]}})
function Ir(){return{commit(e,...t){const r=Ae(arguments),n=function(e){return!ue(e)&&Ze("git.commit: requires the commit message to be supplied as a string/string[]")}(e)||function(e,t,r){return{commands:["-c","core.abbrev=40","commit",...re(e,"-m"),...t,...r],format:"utf-8",parser:xr}}(Z(e),Z(fe(t[0],ue,[])),[...fe(t[1],ie,[]),...ke(arguments,0,!0)])
return this._runTask(n,r)}}}var Pr=E({"src/lib/tasks/commit.ts"(){Ar(),Fe(),ut()}})
var Lr,Nr,$r,Mr=E({"src/lib/tasks/hash-object.ts"(){ut()}})
var jr,Dr=E({"src/lib/responses/InitSummary.ts"(){Lr=class{constructor(e,t,r,n){this.bare=e,this.path=t,this.existing=r,this.gitDir=n}},Nr=/^Init.+ repository in (.+)$/,$r=/^Rein.+ in (.+)$/}})
function Fr(e=!1,t,r){const n=["init",...r]
return e&&!n.includes(jr)&&n.splice(1,0,jr),{commands:n,format:"utf-8",parser:e=>function(e,t,r){const n=String(r).trim()
let s
if(s=Nr.exec(n))return new Lr(e,t,!1,s[1])
if(s=$r.exec(n))return new Lr(e,t,!0,s[1])
let o=""
const i=n.split(" ")
for(;i.length;)if("in"===i.shift()){o=i.join(" ")
break}return new Lr(e,t,/^re/i.test(n),o)}(n.includes("--bare"),t,e)}}var Ur,qr=E({"src/lib/tasks/init.ts"(){Dr(),jr="--bare"}})
function Br(e){for(let t=0;t<e.length;t++){const r=Ur.exec(e[t])
if(r)return`--${r[1]}`}return""}function Gr(e){return Ur.test(e)}var Hr,Vr,Wr,zr,Xr,Yr,Kr=E({"src/lib/args/log-format.ts"(){Ur=/^--(stat|numstat|name-only|name-status)(=|$)/}}),Jr=E({"src/lib/responses/DiffSummary.ts"(){Hr=class{constructor(){this.changed=0,this.deletions=0,this.insertions=0,this.files=[]}}}})
function Qr(e=""){const t=Yr[e]
return e=>Le(new Hr,t,e,!1)}var Zr,en,tn,rn,nn=E({"src/lib/parsers/parse-diff-summary.ts"(){Kr(),Jr(),Fe(),Vr=[new ye(/(.+)\s+\|\s+(\d+)(\s+[+\-]+)?$/,((e,[t,r,n=""])=>{e.files.push({file:t.trim(),changes:te(r),insertions:n.replace(/[^+]/g,"").length,deletions:n.replace(/[^-]/g,"").length,binary:!1})})),new ye(/(.+) \|\s+Bin ([0-9.]+) -> ([0-9.]+) ([a-z]+)/,((e,[t,r,n])=>{e.files.push({file:t.trim(),before:te(r),after:te(n),binary:!0})})),new ye(/(\d+) files? changed\s*((?:, \d+ [^,]+){0,2})/,((e,[t,r])=>{const n=/(\d+) i/.exec(r),s=/(\d+) d/.exec(r)
e.changed=te(t),e.insertions=te(null==n?void 0:n[1]),e.deletions=te(null==s?void 0:s[1])}))],Wr=[new ye(/(\d+)\t(\d+)\t(.+)$/,((e,[t,r,n])=>{const s=te(t),o=te(r)
e.changed++,e.insertions+=s,e.deletions+=o,e.files.push({file:n,changes:s+o,insertions:s,deletions:o,binary:!1})})),new ye(/-\t-\t(.+)$/,((e,[t])=>{e.changed++,e.files.push({file:t,after:0,before:0,binary:!0})}))],zr=[new ye(/(.+)$/,((e,[t])=>{e.changed++,e.files.push({file:t,changes:0,insertions:0,deletions:0,binary:!1})}))],Xr=[new ye(/([ACDMRTUXB])\s*(.+)$/,((e,[t,r])=>{e.changed++,e.files.push({file:r,changes:0,insertions:0,deletions:0,binary:!1})}))],Yr={"":Vr,"--stat":Vr,"--numstat":Wr,"--name-status":Xr,"--name-only":zr}}})
function sn(e=tn,t=rn,r=""){const n=Qr(r)
return function(r){const s=z(r,!0,Zr).map((function(r){const s=r.trim().split(en),o=function(e,t){return t.reduce(((t,r,n)=>(t[r]=e[n]||"",t)),Object.create({diff:null}))}(s[0].trim().split(e),t)
return s.length>1&&s[1].trim()&&(o.diff=n(s[1])),o}))
return{all:s,latest:s.length&&s[0]||null,total:s.length}}}var on=E({"src/lib/parsers/parse-list-log-summary.ts"(){Fe(),nn(),Kr(),Zr="òòòòòò ",en=" òò",tn=" ò ",rn=["hash","date","message","refs","author_name","author_email"]}}),an={}
function cn(e){let t=Br(e)
const r=["diff"]
return""===t&&(t="--stat",r.push("--stat=4096")),r.push(...e),un(r)||{commands:r,format:"utf-8",parser:Qr(t)}}function un(e){const t=e.filter(Gr)
return t.length>1?Ze(`Summary flags are mutually exclusive - pick one of ${t.join(",")}`):t.length&&e.includes("-z")?Ze(`Summary flag ${t} parsing is not compatible with null termination option '-z'`):void 0}b(an,{diffSummaryTask:()=>cn,validateLogFormatConfig:()=>un})
var ln,dn=E({"src/lib/tasks/diff.ts"(){Kr(),nn(),ut()}})
function fn(e={},t=[]){const r=fe(e.splitter,ae,tn),n=!he(e.format)&&e.format?e.format:{hash:"%H",date:!1===e.strictDate?"%ai":"%aI",message:"%s",refs:"%D",body:e.multiLine?"%B":"%b",author_name:!1!==e.mailMap?"%aN":"%an",author_email:!1!==e.mailMap?"%aE":"%ae"},[s,o]=function(e,t){const r=[],n=[]
return Object.keys(e).forEach((t=>{r.push(t),n.push(String(e[t]))})),[r,n.join(t)]}(n,r),i=[],a=[`--pretty=format:${Zr}${o}${en}`,...t],c=e.n||e["max-count"]||e.maxCount
if(c&&a.push(`--max-count=${c}`),e.from||e.to){const t=!1!==e.symmetric?"...":".."
i.push(`${e.from||""}${t}${e.to||""}`)}var u
return ae(e.file)&&i.push("--follow",e.file),Se((u=e,Object.keys(u).reduce(((e,t)=>(t in ln||(e[t]=u[t]),e)),{})),a),{fields:s,splitter:r,commands:[...a,...i]}}function hn(){return{log(...e){const t=Ae(arguments),r=fn(xe(arguments),fe(arguments[0],ie)),n=function(e,t){return ae(e)&&ae(t)&&Ze("git.log(string, string) should be replaced with git.log({ from: string, to: string })")}(...e)||un(r.commands)||function(e){return function(e,t,r){const n=sn(e,t,Br(r))
return{commands:["log",...r],format:"utf-8",parser:n}}(e.splitter,e.fields,e.commands)}(r)
return this._runTask(n,t)}}}var pn,mn,gn,vn,yn,wn=E({"src/lib/tasks/log.ts"(){Kr(),on(),Fe(),ut(),dn(),ln=(e=>(e[e["--pretty"]=0]="--pretty",e[e["max-count"]=1]="max-count",e[e.maxCount=2]="maxCount",e[e.n=3]="n",e[e.file=4]="file",e[e.format=5]="format",e[e.from=6]="from",e[e.to=7]="to",e[e.splitter=8]="splitter",e[e.symmetric=9]="symmetric",e[e.mailMap=10]="mailMap",e[e.multiLine=11]="multiLine",e[e.strictDate=12]="strictDate",e))(ln||{})}}),En=E({"src/lib/responses/MergeSummary.ts"(){pn=class{constructor(e,t=null,r){this.reason=e,this.file=t,this.meta=r}toString(){return`${this.file}:${this.reason}`}},mn=class{constructor(){this.conflicts=[],this.merges=[],this.result="success"}get failed(){return this.conflicts.length>0}get reason(){return this.result}toString(){return this.conflicts.length?`CONFLICTS: ${this.conflicts.join(", ")}`:"OK"}}}}),bn=E({"src/lib/responses/PullSummary.ts"(){gn=class{constructor(){this.remoteMessages={all:[]},this.created=[],this.deleted=[],this.files=[],this.deletions={},this.insertions={},this.summary={changes:0,deletions:0,insertions:0}}},vn=class{constructor(){this.remote="",this.hash={local:"",remote:""},this.branch={local:"",remote:""},this.message=""}toString(){return this.message}}}})
function On(e){return e.objects=e.objects||{compressing:0,counting:0,enumerating:0,packReused:0,reused:{count:0,delta:0},total:{count:0,delta:0}}}function _n(e){const t=/^\s*(\d+)/.exec(e),r=/delta (\d+)/i.exec(e)
return{count:te(t&&t[1]||"0"),delta:te(r&&r[1]||"0")}}var Tn,Rn,Cn=E({"src/lib/parsers/parse-remote-objects.ts"(){Fe(),yn=[new we(/^remote:\s*(enumerating|counting|compressing) objects: (\d+),/i,((e,[t,r])=>{const n=t.toLowerCase(),s=On(e.remoteMessages)
Object.assign(s,{[n]:te(r)})})),new we(/^remote:\s*(enumerating|counting|compressing) objects: \d+% \(\d+\/(\d+)\),/i,((e,[t,r])=>{const n=t.toLowerCase(),s=On(e.remoteMessages)
Object.assign(s,{[n]:te(r)})})),new we(/total ([^,]+), reused ([^,]+), pack-reused (\d+)/i,((e,[t,r,n])=>{const s=On(e.remoteMessages)
s.total=_n(t),s.reused=_n(r),s.packReused=te(n)}))]}})
function Sn(e,t){return Le({remoteMessages:new Rn},Tn,t)}var kn,xn,An,In,Pn,Ln,Nn=E({"src/lib/parsers/parse-remote-messages.ts"(){Fe(),Cn(),Tn=[new we(/^remote:\s*(.+)$/,((e,[t])=>(e.remoteMessages.all.push(t.trim()),!1))),...yn,new we([/create a (?:pull|merge) request/i,/\s(https?:\/\/\S+)$/],((e,[t])=>{e.remoteMessages.pullRequestUrl=t})),new we([/found (\d+) vulnerabilities.+\(([^)]+)\)/i,/\s(https?:\/\/\S+)$/],((e,[t,r,n])=>{e.remoteMessages.vulnerabilities={count:te(t),summary:r,url:n}}))],Rn=class{constructor(){this.all=[]}}}})
var $n,Mn,jn,Dn=E({"src/lib/parsers/parse-pull.ts"(){bn(),Fe(),Nn(),kn=/(\d+)\D+((\d+)\D+\(\+\))?(\D+(\d+)\D+\(-\))?/,xn=/^(create|delete) mode \d+ (.+)/,An=[new ye(/^\s*(.+?)\s+\|\s+\d+\s*(\+*)(-*)/,((e,[t,r,n])=>{e.files.push(t),r&&(e.insertions[t]=r.length),n&&(e.deletions[t]=n.length)})),new ye(kn,((e,[t,,r,,n])=>(void 0!==r||void 0!==n)&&(e.summary.changes=+t||0,e.summary.insertions=+r||0,e.summary.deletions=+n||0,!0))),new ye(xn,((e,[t,r])=>{K(e.files,r),K("create"===t?e.created:e.deleted,r)}))],In=[new ye(/^from\s(.+)$/i,((e,[t])=>{e.remote=t})),new ye(/^fatal:\s(.+)$/,((e,[t])=>{e.message=t})),new ye(/([a-z0-9]+)\.\.([a-z0-9]+)\s+(\S+)\s+->\s+(\S+)$/,((e,[t,r,n,s])=>{e.branch.local=n,e.hash.local=t,e.branch.remote=s,e.hash.remote=r}))],Pn=(e,t)=>Le(new gn,An,[e,t]),Ln=(e,t)=>Object.assign(new gn,Pn(e,t),Sn(0,t))}}),Fn=E({"src/lib/parsers/parse-merge.ts"(){En(),Fe(),Dn(),$n=[new ye(/^Auto-merging\s+(.+)$/,((e,[t])=>{e.merges.push(t)})),new ye(/^CONFLICT\s+\((.+)\): Merge conflict in (.+)$/,((e,[t,r])=>{e.conflicts.push(new pn(t,r))})),new ye(/^CONFLICT\s+\((.+\/delete)\): (.+) deleted in (.+) and/,((e,[t,r,n])=>{e.conflicts.push(new pn(t,r,{deleteRef:n}))})),new ye(/^CONFLICT\s+\((.+)\):/,((e,[t])=>{e.conflicts.push(new pn(t,null))})),new ye(/^Automatic merge failed;\s+(.+)$/,((e,[t])=>{e.result=t}))],Mn=(e,t)=>Object.assign(jn(e,t),Ln(e,t)),jn=e=>Le(new mn,$n,e)}})
function Un(e){return e.length?{commands:["merge",...e],format:"utf-8",parser(e,t){const r=Mn(e,t)
if(r.failed)throw new s(r)
return r}}:Ze("Git.merge requires at least one option")}var qn,Bn,Gn,Hn=E({"src/lib/tasks/merge.ts"(){C(),Fn(),ut()}})
var Vn=E({"src/lib/parsers/parse-push.ts"(){Fe(),Nn(),qn=[new ye(/^Pushing to (.+)$/,((e,[t])=>{e.repo=t})),new ye(/^updating local tracking ref '(.+)'/,((e,[t])=>{e.ref=y(v({},e.ref||{}),{local:t})})),new ye(/^[=*-]\s+([^:]+):(\S+)\s+\[(.+)]$/,((e,[t,r,n])=>{e.pushed.push(function(e,t,r){const n=r.includes("deleted"),s=r.includes("tag")||/^refs\/tags/.test(e),o=!r.includes("new")
return{deleted:n,tag:s,branch:!s,new:!o,alreadyUpdated:o,local:e,remote:t}}(t,r,n))})),new ye(/^Branch '([^']+)' set up to track remote branch '([^']+)' from '([^']+)'/,((e,[t,r,n])=>{e.branch=y(v({},e.branch||{}),{local:t,remote:r,remoteName:n})})),new ye(/^([^:]+):(\S+)\s+([a-z0-9]+)\.\.([a-z0-9]+)$/,((e,[t,r,n,s])=>{e.update={head:{local:t,remote:r},hash:{from:n,to:s}}}))],Bn=(e,t)=>{const r=Gn(e,t),n=Sn(0,t)
return v(v({},r),n)},Gn=(e,t)=>Le({pushed:[]},qn,[e,t])}}),Wn={}
function zn(e={},t){return K(t,"--tags"),Xn(e,t)}function Xn(e={},t){const r=["push",...t]
return e.branch&&r.splice(1,0,e.branch),e.remote&&r.splice(1,0,e.remote),Q(r,"-v"),K(r,"--verbose"),K(r,"--porcelain"),{commands:r,format:"utf-8",parser:Bn}}b(Wn,{pushTagsTask:()=>zn,pushTask:()=>Xn})
var Yn=E({"src/lib/tasks/push.ts"(){Vn(),Fe()}})
var Kn,Jn,Qn,Zn,es,ts=E({"src/lib/tasks/show.ts"(){Fe(),ut()}}),rs=E({"src/lib/responses/FileStatusSummary.ts"(){Kn=/^(.+) -> (.+)$/,Jn=class{constructor(e,t,r){if(this.path=e,this.index=t,this.working_dir=r,t+r==="R"){const t=Kn.exec(e)||[null,e,e]
this.from=t[1]||"",this.path=t[2]||""}}}}})
function ns(e){const[t,r]=e.split(N)
return{from:r||t,to:t}}function ss(e,t,r){return[`${e}${t}`,r]}function os(e,...t){return t.map((t=>ss(e,t,((e,t)=>K(e.conflicted,t)))))}function is(e,t){const r=t.trim()
switch(" "){case r.charAt(2):return n(r.charAt(0),r.charAt(1),r.substr(3))
case r.charAt(1):return n(" ",r.charAt(0),r.substr(2))
default:return}function n(t,r,n){const s=`${t}${r}`,o=Zn.get(s)
o&&o(e,n),"##"!==s&&"!!"!==s&&e.files.push(new Jn(n.replace(/\0.+$/,""),t,r))}}var as,cs=E({"src/lib/responses/StatusSummary.ts"(){Fe(),rs(),Qn=class{constructor(){this.not_added=[],this.conflicted=[],this.created=[],this.deleted=[],this.ignored=void 0,this.modified=[],this.renamed=[],this.files=[],this.staged=[],this.ahead=0,this.behind=0,this.current=null,this.tracking=null,this.detached=!1,this.isClean=()=>!this.files.length}},Zn=new Map([ss(" ","A",((e,t)=>K(e.created,t))),ss(" ","D",((e,t)=>K(e.deleted,t))),ss(" ","M",((e,t)=>K(e.modified,t))),ss("A"," ",((e,t)=>K(e.created,t)&&K(e.staged,t))),ss("A","M",((e,t)=>K(e.created,t)&&K(e.staged,t)&&K(e.modified,t))),ss("D"," ",((e,t)=>K(e.deleted,t)&&K(e.staged,t))),ss("M"," ",((e,t)=>K(e.modified,t)&&K(e.staged,t))),ss("M","M",((e,t)=>K(e.modified,t)&&K(e.staged,t))),ss("R"," ",((e,t)=>{K(e.renamed,ns(t))})),ss("R","M",((e,t)=>{const r=ns(t)
K(e.renamed,r),K(e.modified,r.to)})),ss("!","!",((e,t)=>{K(e.ignored=e.ignored||[],t)})),ss("?","?",((e,t)=>K(e.not_added,t))),...os("A","A","U"),...os("D","D","U"),...os("U","A","D","U"),["##",(e,t)=>{let r
r=/ahead (\d+)/.exec(t),e.ahead=r&&+r[1]||0,r=/behind (\d+)/.exec(t),e.behind=r&&+r[1]||0,r=/^(.+?(?=(?:\.{3}|\s|$)))/.exec(t),e.current=r&&r[1],r=/\.{3}(\S*)/.exec(t),e.tracking=r&&r[1],r=/\son\s([\S]+)$/.exec(t),e.current=r&&r[1]||e.current,e.detached=/\(no branch\)/.test(t)}]]),es=function(e){const t=e.split(N),r=new Qn
for(let e=0,n=t.length;e<n;){let n=t[e++].trim()
n&&("R"===n.charAt(0)&&(n+=N+(t[e++]||"")),is(r,n))}return r}}})
var us,ls,ds=E({"src/lib/tasks/status.ts"(){cs(),as=["--null","-z"]}})
function fs(e=0,t=0,r=0,n="",s=!0){return Object.defineProperty({major:e,minor:t,patch:r,agent:n,installed:s},"toString",{value(){return`${this.major}.${this.minor}.${this.patch}`},configurable:!1,enumerable:!1})}function hs(e){return e===us?fs(0,0,0,"",!1):Le(fs(0,0,0,e),ls,e)}var ps,ms=E({"src/lib/tasks/version.ts"(){Fe(),us="installed=false",ls=[new ye(/version (\d+)\.(\d+)\.(\d+)(?:\s*\((.+)\))?/,((e,[t,r,n,s=""])=>{Object.assign(e,fs(te(t),te(r),te(n),s))})),new ye(/version (\d+)\.(\d+)\.(\D+)(.+)?$/,((e,[t,r,n,s=""])=>{Object.assign(e,fs(te(t),te(r),n,s))}))]}}),gs={}
b(gs,{SimpleGitApi:()=>ps})
var vs,ys,ws,Es=E({"src/lib/simple-git-api.ts"(){_r(),Rr(),kr(),Pr(),St(),Pt(),Mr(),qr(),wn(),Hn(),Yn(),ts(),ds(),ut(),ms(),Fe(),ps=class{constructor(e){this._executor=e}_runTask(e,t){const r=this._executor.chain(),n=r.push(e)
return t&&Or(e,n,t),Object.create(this,{then:{value:n.then.bind(n)},catch:{value:n.catch.bind(n)},_executor:{value:r}})}add(e){return this._runTask(et(["add",...Z(e)]),Ae(arguments))}cwd(e){const t=Ae(arguments)
return"string"==typeof e?this._runTask(Tr(e,this._executor),t):"string"==typeof(null==e?void 0:e.path)?this._runTask(Tr(e.path,e.root&&this._executor||void 0),t):this._runTask(Ze("Git.cwd: workingDirectory must be supplied as a string"),t)}hashObject(e,t){return this._runTask(function(e,t){const r=["hash-object",e]
return t&&r.push("-w"),et(r,!0)}(e,!0===t),Ae(arguments))}init(e){return this._runTask(Fr(!0===e,this._executor.cwd,ke(arguments)),Ae(arguments))}merge(){return this._runTask(Un(ke(arguments)),Ae(arguments))}mergeFromTo(e,t){return ae(e)&&ae(t)?this._runTask(Un([e,t,...ke(arguments)]),Ae(arguments,!1)):this._runTask(Ze("Git.mergeFromTo requires that the 'remote' and 'branch' arguments are supplied as strings"))}outputHandler(e){return this._executor.outputHandler=e,this}push(){const e=Xn({remote:fe(arguments[0],ae),branch:fe(arguments[1],ae)},ke(arguments))
return this._runTask(e,Ae(arguments))}stash(){return this._runTask(et(["stash",...ke(arguments)]),Ae(arguments))}status(){return this._runTask({format:"utf-8",commands:["status","--porcelain","-b","-u","--null",...ke(arguments).filter((e=>!as.includes(e)))],parser:e=>es(e)},Ae(arguments))}},Object.assign(ps.prototype,{checkout(){return this._runTask(Cr(ke(arguments,1)),Ae(arguments))},checkoutBranch(e,t){return this._runTask(Cr(["-b",e,t,...ke(arguments)]),Ae(arguments))},checkoutLocalBranch(e){return this._runTask(Cr(["-b",e,...ke(arguments)]),Ae(arguments))}},Ir(),{addConfig(e,t,...r){return this._runTask(function(e,t,r,n){const s=["config",`--${n}`]
return r&&s.push("--add"),s.push(e,t),{commands:s,format:"utf-8",parser:e=>e}}(e,t,!0===r[0],Et(r[1],"local")),Ae(arguments))},getConfig(e,t){return this._runTask(bt(e,Et(t,void 0)),Ae(arguments))},listConfig(...e){return this._runTask(Ot(Et(e[0],void 0)),Ae(arguments))}},xt(),hn(),{showBuffer(){const e=["show",...ke(arguments,1)]
return e.includes("--binary")||e.splice(1,0,"--binary"),this._runTask(tt(e),Ae(arguments))},show(){const e=["show",...ke(arguments,1)]
return this._runTask(et(e),Ae(arguments))}},{version(){return this._runTask({commands:["--version"],format:"utf-8",parser:hs,onError(e,t,r,n){if(-2===e.exitCode)return r(Buffer.from(us))
n(t)}})}})}}),bs={}
b(bs,{Scheduler:()=>ws})
var Os=E({"src/lib/runners/scheduler.ts"(){Fe(),vs=r(2443),pr(),ys=(()=>{let e=0
return()=>{e++
const{promise:t,done:r}=(0,vs.createDeferred)()
return{promise:t,done:r,id:e}}})(),ws=class{constructor(e=2){this.concurrency=e,this.logger=ur("","scheduler"),this.pending=[],this.running=[],this.logger("Constructed, concurrency=%s",e)}schedule(){if(!this.pending.length||this.running.length>=this.concurrency)return void this.logger("Schedule attempt ignored, pending=%s running=%s concurrency=%s",this.pending.length,this.running.length,this.concurrency)
const e=K(this.running,this.pending.shift())
this.logger("Attempting id=%s",e.id),e.done((()=>{this.logger("Completing id=",e.id),Q(this.running,e),this.schedule()}))}next(){const{promise:e,id:t}=K(this.pending,ys())
return this.logger("Scheduling id=%s",t),this.schedule(),e}}}}),_s={}
function Ts(e,t){return et(["apply",...t,...e])}b(_s,{applyPatchTask:()=>Ts})
var Rs,Cs=E({"src/lib/tasks/apply-patch.ts"(){ut()}})
var Ss,ks,xs,As=E({"src/lib/responses/BranchDeleteSummary.ts"(){Rs=class{constructor(){this.all=[],this.branches={},this.errors=[]}get success(){return!this.errors.length}}}})
function Is(e,t){return 1===t&&Ss.test(e)}var Ps,Ls,Ns=E({"src/lib/parsers/parse-branch-delete.ts"(){As(),Fe(),Ss=/^error[^']+'([^']+)'/m,ks=[new ye(/(\S+)\s+\(\S+\s([^)]+)\)/,((e,[t,r])=>{const n=function(e,t){return{branch:e,hash:t,success:!0}}(t,r)
e.all.push(n),e.branches[t]=n})),new ye(Ss,((e,[t])=>{const r=function(e){return{branch:e,hash:null,success:!1}}(t)
e.errors.push(r),e.all.push(r),e.branches[t]=r}))],xs=(e,t)=>Le(new Rs,ks,[e,t])}}),$s=E({"src/lib/responses/BranchSummary.ts"(){Ps=class{constructor(){this.all=[],this.branches={},this.current="",this.detached=!1}push(e,t,r,n,s){"*"===e&&(this.detached=t,this.current=r),this.all.push(r),this.branches[r]={current:"*"===e,linkedWorkTree:"+"===e,name:r,commit:n,label:s}}}}})
function Ms(e){return e?e.charAt(0):""}function js(e){return Le(new Ps,Ls,e)}var Ds=E({"src/lib/parsers/parse-branch.ts"(){$s(),Fe(),Ls=[new ye(/^([*+]\s)?\((?:HEAD )?detached (?:from|at) (\S+)\)\s+([a-z0-9]+)\s(.*)$/,((e,[t,r,n,s])=>{e.push(Ms(t),!0,r,n,s)})),new ye(/^([*+]\s)?(\S+)\s+([a-z0-9]+)\s?(.*)$/s,((e,[t,r,n,s])=>{e.push(Ms(t),!1,r,n,s)}))]}}),Fs={}
function Us(e){const t=["-d","-D","--delete"]
return e.some((e=>t.includes(e)))}function qs(e){const t=Us(e),r=["branch",...e]
return 1===r.length&&r.push("-a"),r.includes("-v")||r.splice(1,0,"-v"),{format:"utf-8",commands:r,parser:(e,r)=>t?xs(e,r).all[0]:js(e)}}function Bs(){return{format:"utf-8",commands:["branch","-v"],parser:js}}function Gs(e,t=!1){return{format:"utf-8",commands:["branch","-v",t?"-D":"-d",...e],parser:(e,t)=>xs(e,t),onError({exitCode:e,stdOut:t},r,n,s){if(!Is(String(r),e))return s(r)
n(t)}}}function Hs(e,t=!1){const r={format:"utf-8",commands:["branch","-v",t?"-D":"-d",e],parser:(t,r)=>xs(t,r).branches[e],onError({exitCode:e,stdErr:t,stdOut:n},o,i,a){if(!Is(String(o),e))return a(o)
throw new s(r.parser(ne(n),ne(t)),String(o))}}
return r}b(Fs,{branchLocalTask:()=>Bs,branchTask:()=>qs,containsDeleteBranchCommand:()=>Us,deleteBranchTask:()=>Hs,deleteBranchesTask:()=>Gs})
var Vs,Ws=E({"src/lib/tasks/branch.ts"(){C(),Ns(),Ds(),Fe()}}),zs=E({"src/lib/responses/CheckIgnore.ts"(){Vs=e=>e.split(/\n/g).map((e=>e.trim())).filter((e=>!!e))}}),Xs={}
function Ys(e){return{commands:["check-ignore",...e],format:"utf-8",parser:Vs}}b(Xs,{checkIgnoreTask:()=>Ys})
var Ks=E({"src/lib/tasks/check-ignore.ts"(){zs()}}),Js={}
function Qs(e){return/^--upload-pack(=|$)/.test(e)}function Zs(e,t,r){const n=["clone",...r]
ae(e)&&n.push(e),ae(t)&&n.push(t)
return n.find(Qs)?Ze("git.fetch: potential exploit argument blocked."):et(n)}function eo(e,t,r){return K(r,"--mirror"),Zs(e,t,r)}b(Js,{cloneMirrorTask:()=>eo,cloneTask:()=>Zs})
var to,ro=E({"src/lib/tasks/clone.ts"(){ut(),Fe()}})
function no(e,t){return Le({raw:e,remote:null,branches:[],tags:[],updated:[],deleted:[]},to,[e,t])}var so=E({"src/lib/parsers/parse-fetch.ts"(){Fe(),to=[new ye(/From (.+)$/,((e,[t])=>{e.remote=t})),new ye(/\* \[new branch]\s+(\S+)\s*-> (.+)$/,((e,[t,r])=>{e.branches.push({name:t,tracking:r})})),new ye(/\* \[new tag]\s+(\S+)\s*-> (.+)$/,((e,[t,r])=>{e.tags.push({name:t,tracking:r})})),new ye(/- \[deleted]\s+\S+\s*-> (.+)$/,((e,[t])=>{e.deleted.push({tracking:t})})),new ye(/\s*([^.]+)\.\.(\S+)\s+(\S+)\s*-> (.+)$/,((e,[t,r,n,s])=>{e.updated.push({name:n,tracking:s,to:r,from:t})}))]}}),oo={}
function io(e){return/^--upload-pack(=|$)/.test(e)}function ao(e,t,r){const n=["fetch",...r]
e&&t&&n.push(e,t)
return n.find(io)?Ze("git.fetch: potential exploit argument blocked."):{commands:n,format:"utf-8",parser:no}}b(oo,{fetchTask:()=>ao})
var co,uo=E({"src/lib/tasks/fetch.ts"(){so(),ut()}})
function lo(e){return Le({moves:[]},co,e)}var fo=E({"src/lib/parsers/parse-move.ts"(){Fe(),co=[new ye(/^Renaming (.+) to (.+)$/,((e,[t,r])=>{e.moves.push({from:t,to:r})}))]}}),ho={}
function po(e,t){return{commands:["mv","-v",...Z(e),t],format:"utf-8",parser:lo}}b(ho,{moveTask:()=>po})
var mo=E({"src/lib/tasks/move.ts"(){fo(),Fe()}}),go={}
function vo(e,t,r){const n=["pull",...r]
return e&&t&&n.splice(1,0,e,t),{commands:n,format:"utf-8",parser:(e,t)=>Ln(e,t),onError(e,t,r,n){const o=function(e,t){const r=Le(new vn,In,[e,t])
return r.message&&r}(ne(e.stdOut),ne(e.stdErr))
if(o)return n(new s(o))
n(t)}}}b(go,{pullTask:()=>vo})
var yo=E({"src/lib/tasks/pull.ts"(){C(),Dn(),Fe()}})
function wo(e){const t={}
return bo(e,(([e])=>t[e]={name:e})),Object.values(t)}function Eo(e){const t={}
return bo(e,(([e,r,n])=>{t.hasOwnProperty(e)||(t[e]={name:e,refs:{fetch:"",push:""}}),n&&r&&(t[e].refs[n.replace(/[^a-z]/g,"")]=r)})),Object.values(t)}function bo(e,t){X(e,(e=>t(e.split(/\s+/))))}var Oo=E({"src/lib/responses/GetRemoteSummary.ts"(){Fe()}}),_o={}
function To(e,t,r=[]){return et(["remote","add",...r,e,t])}function Ro(e){const t=["remote"]
return e&&t.push("-v"),{commands:t,format:"utf-8",parser:e?Eo:wo}}function Co(e=[]){const t=[...e]
return"ls-remote"!==t[0]&&t.unshift("ls-remote"),et(t)}function So(e=[]){const t=[...e]
return"remote"!==t[0]&&t.unshift("remote"),et(t)}function ko(e){return et(["remote","remove",e])}b(_o,{addRemoteTask:()=>To,getRemotesTask:()=>Ro,listRemotesTask:()=>Co,remoteTask:()=>So,removeRemoteTask:()=>ko})
var xo=E({"src/lib/tasks/remote.ts"(){Oo(),ut()}}),Ao={}
function Io(e={},t){const r=fn(e),n=["stash","list",...r.commands,...t],s=sn(r.splitter,r.fields,Br(n))
return un(n)||{commands:n,format:"utf-8",parser:s}}b(Ao,{stashListTask:()=>Io})
var Po=E({"src/lib/tasks/stash-list.ts"(){Kr(),on(),dn(),wn()}}),Lo={}
function No(e,t){return Mo(["add",e,t])}function $o(e){return Mo(["init",...e])}function Mo(e){const t=[...e]
return"submodule"!==t[0]&&t.unshift("submodule"),et(t)}function jo(e){return Mo(["update",...e])}b(Lo,{addSubModuleTask:()=>No,initSubModuleTask:()=>$o,subModuleTask:()=>Mo,updateSubModuleTask:()=>jo})
var Do,Fo,Uo=E({"src/lib/tasks/sub-module.ts"(){ut()}})
function qo(e,t){return e===t?0:e>t?1:-1}function Bo(e){return e.trim()}function Go(e){return"string"==typeof e&&parseInt(e.replace(/^\D+/g,""),10)||0}var Ho=E({"src/lib/responses/TagList.ts"(){Do=class{constructor(e,t){this.all=e,this.latest=t}},Fo=function(e,t=!1){const r=e.split("\n").map(Bo).filter(Boolean)
t||r.sort((function(e,t){const r=e.split("."),n=t.split(".")
if(1===r.length||1===n.length)return function(e,t){const r=isNaN(e)
return r!==isNaN(t)?r?1:-1:r?qo(e,t):0}(Go(r[0]),Go(n[0]))
for(let e=0,t=Math.max(r.length,n.length);e<t;e++){const t=qo(Go(r[e]),Go(n[e]))
if(t)return t}return 0}))
const n=t?r[0]:[...r].reverse().find((e=>e.indexOf(".")>=0))
return new Do(r,n)}}}),Vo={}
function Wo(e=[]){const t=e.some((e=>/^--sort=/.test(e)))
return{format:"utf-8",commands:["tag","-l",...e],parser:e=>Fo(e,t)}}function zo(e){return{format:"utf-8",commands:["tag",e],parser:()=>({name:e})}}function Xo(e,t){return{format:"utf-8",commands:["tag","-a","-m",t,e],parser:()=>({name:e})}}b(Vo,{addAnnotatedTagTask:()=>Xo,addTagTask:()=>zo,tagListTask:()=>Wo})
var Yo,Ko,Jo,Qo=E({"src/lib/tasks/tag.ts"(){Ho()}}),Zo=(Yo={"src/git.js"(e,t){var{GitExecutor:r}=(br(),_(Er)),{SimpleGitApi:n}=(Es(),_(gs)),{Scheduler:s}=(Os(),_(bs)),{configurationErrorTask:o}=(ut(),_(Je)),{asArray:i,filterArray:a,filterPrimitives:c,filterString:u,filterStringOrStringArray:l,filterType:d,getTrailingOptions:f,trailingFunctionArgument:h,trailingOptionsArgument:p}=(Fe(),_($e)),{applyPatchTask:m}=(Cs(),_(_s)),{branchTask:g,branchLocalTask:v,deleteBranchesTask:y,deleteBranchTask:w}=(Ws(),_(Fs)),{checkIgnoreTask:E}=(Ks(),_(Xs)),{checkIsRepoTask:b}=(Xe(),_(Ue)),{cloneTask:O,cloneMirrorTask:T}=(ro(),_(Js)),{cleanWithOptionsTask:R,isCleanOptionsArray:C}=(gt(),_(lt)),{diffSummaryTask:S}=(dn(),_(an)),{fetchTask:k}=(uo(),_(oo)),{moveTask:x}=(mo(),_(ho)),{pullTask:A}=(yo(),_(go)),{pushTagsTask:I}=(Yn(),_(Wn)),{addRemoteTask:P,getRemotesTask:L,listRemotesTask:N,remoteTask:$,removeRemoteTask:M}=(xo(),_(_o)),{getResetMode:j,resetTask:D}=(jt(),_(Lt)),{stashListTask:F}=(Po(),_(Ao)),{addSubModuleTask:U,initSubModuleTask:q,subModuleTask:B,updateSubModuleTask:G}=(Uo(),_(Lo)),{addAnnotatedTagTask:H,addTagTask:V,tagListTask:W}=(Qo(),_(Vo)),{straightThroughBufferTask:z,straightThroughStringTask:X}=(ut(),_(Je))
function Y(e,t){this._executor=new r(e.binary,e.baseDir,new s(e.maxConcurrentProcesses),t),this._trimmed=e.trimmed}function K(e,t,r,n){return"string"!=typeof r?o(`git.${e}() requires a string 'repoPath'`):t(r,d(n,u),f(arguments))}(Y.prototype=Object.create(n.prototype)).constructor=Y,Y.prototype.customBinary=function(e){return this._executor.binary=e,this},Y.prototype.env=function(e,t){return 1===arguments.length&&"object"==typeof e?this._executor.env=e:(this._executor.env=this._executor.env||{})[e]=t,this},Y.prototype.stashList=function(e){return this._runTask(F(p(arguments)||{},a(e)&&e||[]),h(arguments))},Y.prototype.clone=function(){return this._runTask(K("clone",O,...arguments),h(arguments))},Y.prototype.mirror=function(){return this._runTask(K("mirror",T,...arguments),h(arguments))},Y.prototype.mv=function(e,t){return this._runTask(x(e,t),h(arguments))},Y.prototype.checkoutLatestTag=function(e){var t=this
return this.pull((function(){t.tags((function(r,n){t.checkout(n.latest,e)}))}))},Y.prototype.pull=function(e,t,r,n){return this._runTask(A(d(e,u),d(t,u),f(arguments)),h(arguments))},Y.prototype.fetch=function(e,t){return this._runTask(k(d(e,u),d(t,u),f(arguments)),h(arguments))},Y.prototype.silent=function(e){return console.warn("simple-git deprecation notice: git.silent: logging should be configured using the `debug` library / `DEBUG` environment variable, this will be an error in version 3"),this},Y.prototype.tags=function(e,t){return this._runTask(W(f(arguments)),h(arguments))},Y.prototype.rebase=function(){return this._runTask(X(["rebase",...f(arguments)]),h(arguments))},Y.prototype.reset=function(e){return this._runTask(D(j(e),f(arguments)),h(arguments))},Y.prototype.revert=function(e){const t=h(arguments)
return"string"!=typeof e?this._runTask(o("Commit must be a string"),t):this._runTask(X(["revert",...f(arguments,0,!0),e]),t)},Y.prototype.addTag=function(e){const t="string"==typeof e?V(e):o("Git.addTag requires a tag name")
return this._runTask(t,h(arguments))},Y.prototype.addAnnotatedTag=function(e,t){return this._runTask(H(e,t),h(arguments))},Y.prototype.deleteLocalBranch=function(e,t,r){return this._runTask(w(e,"boolean"==typeof t&&t),h(arguments))},Y.prototype.deleteLocalBranches=function(e,t,r){return this._runTask(y(e,"boolean"==typeof t&&t),h(arguments))},Y.prototype.branch=function(e,t){return this._runTask(g(f(arguments)),h(arguments))},Y.prototype.branchLocal=function(e){return this._runTask(v(),h(arguments))},Y.prototype.raw=function(e){const t=!Array.isArray(e),r=[].slice.call(t?arguments:e,0)
for(let e=0;e<r.length&&t;e++)if(!c(r[e])){r.splice(e,r.length-e)
break}r.push(...f(arguments,0,!0))
var n=h(arguments)
return r.length?this._runTask(X(r,this._trimmed),n):this._runTask(o("Raw: must supply one or more command to execute"),n)},Y.prototype.submoduleAdd=function(e,t,r){return this._runTask(U(e,t),h(arguments))},Y.prototype.submoduleUpdate=function(e,t){return this._runTask(G(f(arguments,!0)),h(arguments))},Y.prototype.submoduleInit=function(e,t){return this._runTask(q(f(arguments,!0)),h(arguments))},Y.prototype.subModule=function(e,t){return this._runTask(B(f(arguments)),h(arguments))},Y.prototype.listRemote=function(){return this._runTask(N(f(arguments)),h(arguments))},Y.prototype.addRemote=function(e,t,r){return this._runTask(P(e,t,f(arguments)),h(arguments))},Y.prototype.removeRemote=function(e,t){return this._runTask(M(e),h(arguments))},Y.prototype.getRemotes=function(e,t){return this._runTask(L(!0===e),h(arguments))},Y.prototype.remote=function(e,t){return this._runTask($(f(arguments)),h(arguments))},Y.prototype.tag=function(e,t){const r=f(arguments)
return"tag"!==r[0]&&r.unshift("tag"),this._runTask(X(r),h(arguments))},Y.prototype.updateServerInfo=function(e){return this._runTask(X(["update-server-info"]),h(arguments))},Y.prototype.pushTags=function(e,t){const r=I({remote:d(e,u)},f(arguments))
return this._runTask(r,h(arguments))},Y.prototype.rm=function(e){return this._runTask(X(["rm","-f",...i(e)]),h(arguments))},Y.prototype.rmKeepLocal=function(e){return this._runTask(X(["rm","--cached",...i(e)]),h(arguments))},Y.prototype.catFile=function(e,t){return this._catFile("utf-8",arguments)},Y.prototype.binaryCatFile=function(){return this._catFile("buffer",arguments)},Y.prototype._catFile=function(e,t){var r=h(t),n=["cat-file"],s=t[0]
if("string"==typeof s)return this._runTask(o("Git.catFile: options must be supplied as an array of strings"),r)
Array.isArray(s)&&n.push.apply(n,s)
const i="buffer"===e?z(n):X(n)
return this._runTask(i,r)},Y.prototype.diff=function(e,t){const r=u(e)?o("git.diff: supplying options as a single string is no longer supported, switch to an array of strings"):X(["diff",...f(arguments)])
return this._runTask(r,h(arguments))},Y.prototype.diffSummary=function(){return this._runTask(S(f(arguments,1)),h(arguments))},Y.prototype.applyPatch=function(e){const t=l(e)?m(i(e),f([].slice.call(arguments,1))):o("git.applyPatch requires one or more string patches as the first argument")
return this._runTask(t,h(arguments))},Y.prototype.revparse=function(){const e=["rev-parse",...f(arguments,!0)]
return this._runTask(X(e,!0),h(arguments))},Y.prototype.clean=function(e,t,r){const n=C(e),s=n&&e.join("")||d(e,u)||"",o=f([].slice.call(arguments,n?1:0))
return this._runTask(R(s,o),h(arguments))},Y.prototype.exec=function(e){const t={commands:[],format:"utf-8",parser(){"function"==typeof e&&e()}}
return this._runTask(t)},Y.prototype.clearQueue=function(){return this},Y.prototype.checkIgnore=function(e,t){return this._runTask(E(i(d(e,l,[]))),h(arguments))},Y.prototype.checkIsRepo=function(e,t){return this._runTask(b(d(e,u)),h(arguments))},t.exports=Y}},function(){return Ko||(0,Yo[d(Yo)[0]])((Ko={exports:{}}).exports,Ko),Ko.exports}),ei={}
function ti(e){return Object.defineProperties(e,{__esModule:{value:!0},default:{value:e}})}function ri(e){return Object.assign(e.bind(null),Dt)}function ni(e,t){const r=new Qt,n=Re(e&&("string"==typeof e?{baseDir:e}:e)||{},t)
if(!Y(n.baseDir))throw new A(n,"Cannot use simple-git on a directory that does not exist")
return Array.isArray(n.config)&&r.add(function(e){const t=re(e,"-c")
return{type:"spawn.args",action:e=>[...t,...e]}}(n.config)),r.add(qt(n.unsafe)),r.add({type:"spawn.args",action(e){const t=[]
let r
function n(e){(r=r||[]).push(...e)}for(let r=0;r<e.length;r++){const s=e[r]
if(k(s))n(x(s))
else{if("--"===s){n(e.slice(r+1).flatMap((e=>k(e)&&x(e)||e)))
break}t.push(s)}}return r?[...t,"--",...r.map(String)]:t}}),r.add(Wt(n.completion)),n.abort&&r.add(function(e){if(!e)return
return[{type:"spawn.before",action(t,r){e.aborted&&r.kill(new I(void 0,"abort","Abort already signaled"))}},{type:"spawn.after",action(t,r){function n(){r.kill(new I(void 0,"abort","Abort signal received"))}e.addEventListener("abort",n),r.spawned.on("close",(()=>e.removeEventListener("abort",n)))}}]}(n.abort)),n.progress&&r.add(function(e){const t="--progress",r=["checkout","clone","fetch","pull","push"]
return[{type:"spawn.args",action:(e,n)=>r.includes(n.method)?J(e,t):e},{type:"spawn.after",action(r,n){var s
n.commands.includes(t)&&(null==(s=n.spawned.stderr)||s.on("data",(t=>{const r=/^([\s\S]+?):\s*(\d+)% \((\d+)\/(\d+)\)/.exec(t.toString("utf8"))
var s
r&&e({method:n.method,stage:(s=r[1],String(s.toLowerCase().split(" ",1))||"unknown"),progress:te(r[2]),processed:te(r[3]),total:te(r[4])})})))}}]}(n.progress)),n.timeout&&r.add(function({block:e,stdErr:t=!0,stdOut:r=!0}){if(e>0)return{type:"spawn.after",action(n,s){var o,i
let a
function c(){a&&clearTimeout(a),a=setTimeout(l,e)}function u(){var e,t
null==(e=s.spawned.stdout)||e.off("data",c),null==(t=s.spawned.stderr)||t.off("data",c),s.spawned.off("exit",u),s.spawned.off("close",u),a&&clearTimeout(a)}function l(){u(),s.kill(new I(void 0,"timeout","block timeout reached"))}r&&(null==(o=s.spawned.stdout)||o.on("data",c)),t&&(null==(i=s.spawned.stderr)||i.on("data",c)),s.spawned.on("exit",u),s.spawned.on("close",u),c()}}}(n.timeout)),n.spawnOptions&&r.add(function(e){const t=se(e,["uid","gid"])
return{type:"spawn.options",action:e=>v(v({},t),e)}}(n.spawnOptions)),r.add(Jt(Kt(!0))),n.errors&&r.add(Jt(n.errors)),new Jo(n,r)}b(ei,{esModuleFactory:()=>ti,gitExportFactory:()=>ri,gitInstanceFactory:()=>ni})
var si,oi,ii=E({"src/lib/git-factory.ts"(){Ft(),or(),ar(),Fe(),Jo=Zo()}}),ai={}
function ci(...e){let t,r=Promise.resolve()
try{t=ni(...e)}catch(e){r=Promise.reject(e)}function n(){return i}function o(){return r}const i=[...si,...oi].reduce(((e,i)=>{const a=oi.includes(i),c=a?(u=i,l=t,function(...e){if("function"==typeof e[e.length])throw new TypeError("Promise interface requires that handlers are not supplied inline, trailing function not allowed in call to "+u)
return r.then((function(){return new Promise((function(t,r){const n=(e,n)=>{if(e)return r((o=e)instanceof Error?o:"string"==typeof o?new Error(o):new s(o))
var o
t(n)}
e.push(n),l[u].apply(l,e)}))}))}):function(e,t,r){return(...n)=>(t[e](...n),r)}(i,t,e)
var u,l
const d=a?o:n
return Object.defineProperty(e,i,{enumerable:!1,configurable:!1,value:t?c:d}),e}),{})
return i}b(ai,{gitP:()=>ci})
var ui=E({"src/lib/runners/promise-wrapped.ts"(){C(),ii(),si=["customBinary","env","outputHandler","silent"],oi=["add","addAnnotatedTag","addConfig","addRemote","addTag","applyPatch","binaryCatFile","branch","branchLocal","catFile","checkIgnore","checkIsRepo","checkout","checkoutBranch","checkoutLatestTag","checkoutLocalBranch","clean","clone","commit","cwd","deleteLocalBranch","deleteLocalBranches","diff","diffSummary","exec","fetch","getRemotes","init","listConfig","listRemote","log","merge","mergeFromTo","mirror","mv","pull","push","pushTags","raw","rebase","remote","removeRemote","reset","revert","revparse","rm","rmKeepLocal","show","stash","stashList","status","subModule","submoduleAdd","submoduleInit","submoduleUpdate","tag","tags","updateServerInfo"]}}),{gitP:li}=(ui(),_(ai)),{esModuleFactory:di,gitInstanceFactory:fi,gitExportFactory:hi}=(ii(),_(ei)),pi=di(hi(fi))
e.exports=Object.assign(pi,{gitP:li,simpleGit:pi})},2130:(e,t,r)=>{"use strict"
const n=r(2037),s=r(6224),o=r(6560),{env:i}=process
let a
function c(e){return 0!==e&&{level:e,hasBasic:!0,has256:e>=2,has16m:e>=3}}function u(e,t){if(0===a)return 0
if(o("color=16m")||o("color=full")||o("color=truecolor"))return 3
if(o("color=256"))return 2
if(e&&!t&&void 0===a)return 0
const r=a||0
if("dumb"===i.TERM)return r
if("win32"===process.platform){const e=n.release().split(".")
return Number(e[0])>=10&&Number(e[2])>=10586?Number(e[2])>=14931?3:2:1}if("CI"in i)return["TRAVIS","CIRCLECI","APPVEYOR","GITLAB_CI","GITHUB_ACTIONS","BUILDKITE"].some((e=>e in i))||"codeship"===i.CI_NAME?1:r
if("TEAMCITY_VERSION"in i)return/^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(i.TEAMCITY_VERSION)?1:0
if("truecolor"===i.COLORTERM)return 3
if("TERM_PROGRAM"in i){const e=parseInt((i.TERM_PROGRAM_VERSION||"").split(".")[0],10)
switch(i.TERM_PROGRAM){case"iTerm.app":return e>=3?3:2
case"Apple_Terminal":return 2}}return/-256(color)?$/i.test(i.TERM)?2:/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(i.TERM)||"COLORTERM"in i?1:r}o("no-color")||o("no-colors")||o("color=false")||o("color=never")?a=0:(o("color")||o("colors")||o("color=true")||o("color=always"))&&(a=1),"FORCE_COLOR"in i&&(a="true"===i.FORCE_COLOR?1:"false"===i.FORCE_COLOR?0:0===i.FORCE_COLOR.length?1:Math.min(parseInt(i.FORCE_COLOR,10),3)),e.exports={supportsColor:function(e){return c(u(e,e&&e.isTTY))},stdout:c(u(!0,s.isatty(1))),stderr:c(u(!0,s.isatty(2)))}},6473:(e,t)=>{"use strict"
Object.defineProperty(t,"__esModule",{value:!0}),t.getUrls=void 0,t.getUrls={fasm1(e,t){const r=(e.alt?[e.alt,e.name]:[e.name]).map((e=>{const r=e.replace(/\./g,"")
return{windows:parseInt(r)<parseInt("1.54".replace(/\./g,""))?`fasmc${r}.zip`:`fasmw${r}.zip`,linux:`fasm-${e}.tgz`,unix:`fasm-${e}.tar.gz`}[t]}))
return["https://flatassembler.net/","http://fasm.sourceforge.net/archive/recent/","http://comrade.ownz.com/fasm/"].flatMap((e=>r.map((t=>e+t))))},fasmg(e){const t=(e.alt?[e.alt,e.name]:[e.name]).map((e=>`fasmg.${e}.zip`))
return["https://flatassembler.net/"].flatMap((e=>t.map((t=>e+t))))},fasmarm(e,t){const r=["FASMARM_full.ZIP"]
return"windows"===t&&r.unshift("FASMARM_win32.ZIP"),["https://arm.flatassembler.net/"].flatMap((e=>r.map((t=>e+t))))}}},9872:function(e,t,r){"use strict"
var n=this&&this.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r)
var s=Object.getOwnPropertyDescriptor(t,r)
s&&!("get"in s?!t.__esModule:s.writable||s.configurable)||(s={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,n,s)}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),s=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),o=this&&this.__importStar||function(e){if(e&&e.__esModule)return e
var t={}
if(null!=e)for(var r in e)"default"!==r&&Object.prototype.hasOwnProperty.call(e,r)&&n(t,e,r)
return s(t,e),t},i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}}
Object.defineProperty(t,"__esModule",{value:!0}),t.downloadVersion=t.downloadVersionArchive=t.HttpError=t.HashMismatchError=t.MissingHashError=t.DownloadError=t.downloadUrl=t.hashFile=t.getMatchingVersions=void 0
const a=i(r(6005)),c=i(r(7561)),u=i(r(3977)),l=r(6402),d=o(r(2225)),f=o(r(4392)),h=r(6473),p=r(679)
async function m(e){const t=c.default.createReadStream(e),r=a.default.createHash("BLAKE2b512").setEncoding("hex")
return await(0,l.pipeline)(t,r),r.read()}async function g(e,t,r,n){if(!("https:"===e.protocol)&&!r&&!t)throw new y(e)
let s
try{s=await f.downloadTool(e.href,n)}catch(t){throw t instanceof f.HTTPError?new E(e,t.httpStatusCode,{cause:t}):t}if(r){const t=await m(s)
if(!(0,p.equalsIgnoreCase)(t,r))throw await u.default.unlink(s),new w(e,r,t)}return s}t.getMatchingVersions=function(e,t,r){if(t=t.toLowerCase(),["latest","*"].includes(t))return e.versions
if(t.endsWith(".*")){const r=t.slice(0,-2)
return e.versions.filter((e=>e.name.toLowerCase().startsWith(r)&&[".",void 0].includes(e.name[r.length])))}{const n=e.versions.find((e=>e.name.toLowerCase()===t))
if(!n)return"never"===r?[]:["secure","insecure"].includes(r)?[{name:t,allowInsecure:"insecure"===r,userProvided:!0}]:[{name:t,hashes:new Proxy({},{get:()=>r}),userProvided:!0}]
if("secure"!==r){if("insecure"===r)return[{...n,allowInsecure:!0}]
if(r)return[{...n,hashes:new Proxy({},{get:()=>r}),userProvided:!0}]}return[n]}},t.hashFile=m,t.downloadUrl=g
class v extends Error{url
constructor(e,t,r){super(t,r),this.url=e}}t.DownloadError=v
class y extends v{constructor(e,t){super(e,`no hash found for insecure URL ${e.href}`,t)}}t.MissingHashError=y
class w extends v{constructor(e,t,r,n){super(e,`expected hash ${t} but got ${r} for ${e.href}`,n)}}t.HashMismatchError=w
class E extends v{httpStatusCode
constructor(e,t,r){super(e,`HTTP error${void 0!==t?` (${t})`:""} while downloading ${e.href}`,r),this.httpStatusCode=t}}t.HttpError=E
const b="https://flatassembler.net"
async function O(e,t,r,n,s=!1){const o=`${e} ${t.name} for ${r}`,i=(t.hashes||{})[r]
let a=!1,c=!1
const u=h.getUrls[e](t,r).map((e=>new URL(e)))
for(const e of u){d.info(`trying ${e.href}`)
try{return{path:await g(e,!!t.allowInsecure,s&&e.origin===b?void 0:i,n),url:e}}catch(e){if(e instanceof y){c=!0,d.warning(`${e.message} for ${o}; not using this file`)
continue}if(e instanceof w){c=!0,d.warning(`${e.message} for ${o}${t.userProvided?"":", you may want to report this to the setup-fasm action maintainer"}; not using this file`)
continue}if(e instanceof E){void 0!==e.httpStatusCode&&(a||=404!==e.httpStatusCode),(404===e.httpStatusCode?d.info:d.warning)(`${e.message} for ${o}`)
continue}throw e}}return d.warning(`all attempts at downloading ${o} failed; `+(c?"some hash problems were encountered":a?"some servers seem to have problems with the requests":`${e} ${t.name} not found for ${r}`)),null}t.downloadVersionArchive=O
const _="ia32"
t.downloadVersion=async function(e,t,r,n=!1,s=!1){const o=`${e}-${r}-${t.name}`,i=f.find(o,"0.0.0",_)
if(i){if(d.info("found cached"),!t.dynamic||n)return i
d.info("but may be updated")}const a=await O(e,t,r,void 0,s)
if(!a)return null
let{path:c,url:l}=a
l.pathname.toLowerCase().endsWith(".zip")&&!c.endsWith(".zip")&&await u.default.rename(c,c=`${c}.zip`)
const h=l.pathname.toLowerCase().endsWith(".zip")?f.extractZip:f.extractTar,p=await h(c)
return await u.default.unlink(c),await f.cacheDir(p,o,"0.0.0",_),p}},4470:function(e,t,r){"use strict"
var n=this&&this.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r)
var s=Object.getOwnPropertyDescriptor(t,r)
s&&!("get"in s?!t.__esModule:s.writable||s.configurable)||(s={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,n,s)}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),s=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),o=this&&this.__importStar||function(e){if(e&&e.__esModule)return e
var t={}
if(null!=e)for(var r in e)"default"!==r&&Object.prototype.hasOwnProperty.call(e,r)&&n(t,e,r)
return s(t,e),t},i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}}
Object.defineProperty(t,"__esModule",{value:!0})
const a=r(6005),c=i(r(7561)),u=i(r(3977)),l=i(r(2286)),d=i(r(612)),f=i(r(9411)),h=i(r(7742)),p=i(r(6465)),m=i(r(7261)),g=o(r(2225)),v=i(r(6998)),y=r(9872),w=new URL("https://raw.githubusercontent.com/stevenwdv/fasm-versions/v1/fasm_versions.json"),E=new URL("https://github.com/tgrysztar/fasmg.git")
const b={aix:"unix",android:"linux",cygwin:"windows",freebsd:"unix",haiku:"unix",linux:"linux",netbsd:"unix",openbsd:"unix",sunos:"unix",win32:"windows"}
async function O(e,t,r,n,s){const o=await u.default.readdir(n),i=1===o.length&&(await u.default.stat(f.default.join(n,o[0]))).isDirectory()?f.default.join(n,o[0]):n
g.addPath(i)
{const t=[".x64","",".exe",".o"].map((t=>`${{fasm1:"fasm",fasmg:"fasmg",fasmarm:"fasmarm"}[e]}${t}`))
await Promise.all(t.map((async e=>{const t=f.default.join(i,e),r=await u.default.stat(t).catch((()=>null))
r?.isFile()&&await u.default.chmod(t,73|r.mode)})))}if(s)for(const e of["INCLUDE","include"]){const t=f.default.join(i,e)
if((await u.default.stat(t).catch((()=>null)))?.isDirectory()){T(t)
break}}g.setOutput("path",i),g.setOutput("edition",e),g.setOutput("version",r),g.setOutput("platform",t),g.info(`successfully installed ${e} ${r} for ${t} to ${i}`)}async function _(e,t,r){g.startGroup("downloading fasm g packages")
const n=f.default.join(h.default.env.RUNNER_TEMP||d.default.tmpdir(),(0,a.randomUUID)())
await(0,v.default)().clone(E.href,n,["--filter=blob:none","--sparse","--no-checkout"]).cwd(n).checkout(e??"HEAD").raw("sparse-checkout","add","--cone","packages"),g.info("checked out fasm g packages repository")
const s=f.default.join(n,"packages")
if(!(await u.default.stat(s).catch((()=>null)))?.isDirectory())throw new Error("cannot find fasm g packages directory")
g.setOutput("fasmg-packages",s),r&&T(s)
for(const e of t){const t=f.default.join(s,e)
if(!(await u.default.stat(s).catch((()=>null)))?.isDirectory())throw new Error(`fasm g package ${e} not found`)
const r=f.default.join(t,"include");(await u.default.stat(r).catch((()=>null)))?.isDirectory()?T(r):T(t)}g.endGroup(),g.info(`successfully installed fasm g packages to ${s}`)}function T(e){g.info(`adding to include: ${e}`)
let t=h.default.env.INCLUDE??""
t&&(t+=";"),t+=e,g.exportVariable("INCLUDE",t)}(async()=>{try{await async function(){const e=g.getInput("edition").toLowerCase(),t=g.getInput("version").toLowerCase(),r=g.getBooleanInput("ignore-official-https-hash-mismatch"),n=g.getInput("download-unknown").toLowerCase(),s=g.getInput("custom-version-list"),o=g.getBooleanInput("assume-dynamic-unchanged"),i=g.getInput("fasmg-download-packages"),a=g.getInput("fasmg-include-packages").toLowerCase().split(/,\s*/).filter((e=>e)),u=g.getBooleanInput("set-include-envvar")
if("fasmg"!==e&&("false"!==i.toLowerCase()||a.length))return void g.setFailed("fasm g packages option set but requested edition is not fasmg")
if(a.length&&"false"===i.toLowerCase())return void g.setFailed("fasmg-include-packages set without fasmg-download-packages")
let f
s?(g.info("reading version list"),f=await p.default.json(c.default.createReadStream(s))):(g.info("downloading version list"),f=await new Promise(((e,t)=>{l.default.get(w,(r=>{200!==r.statusCode?t(new Error(`failed to download ${w.href}: HTTP ${r.statusCode} ${r.statusMessage}`)):e(p.default.json(r))})).on("error",(e=>t(new Error(`failed to download ${w.href}`,{cause:e}))))})))
const h=f.editions[e]
if(!h)return void g.setFailed(`requested edition '${e}' not found`)
const m=e,v=(0,y.getMatchingVersions)(h,t,n)
if(!v.length)return void g.setFailed(`requested version '${t}' not found for edition ${m}`)
const E=d.default.platform()
if("darwin"===E)return void g.setFailed("macOS does not support ELF binaries, so fasm is not available")
let T=b[E]
T||(g.warning(`unknown current platform ${E}, trying unix`),T="unix")
let R=10
for(const e of v){g.startGroup(`using ${e.name}`)
let t=await(0,y.downloadVersion)(m,e,T,o,r)
if(t||"linux"!==T||(g.info("no linux version found, trying unix instead"),t=await(0,y.downloadVersion)(m,e,"unix",o,r),t&&(T="unix")),g.endGroup(),t)return await O(m,T,e.name,t,u),void("fasmg"===m&&"false"!==i.toLowerCase()&&await _("true"===i.toLowerCase()?null:i,a,u))
if(! --R)return void g.setFailed("maximum number of versions to try exceeded")}g.setFailed(`could not download ${e} ${t} for ${T}`)}()}catch(e){g.setFailed(m.default.inspect(e))}})()},679:(e,t)=>{"use strict"
Object.defineProperty(t,"__esModule",{value:!0}),t.equalsIgnoreCase=void 0,t.equalsIgnoreCase=function(e,t){return e.toLowerCase()===t.toLowerCase()}},6149:(e,t,r)=>{e.exports=r(5468)},5468:(e,t,r)=>{"use strict"
r(1808)
var n,s=r(4404),o=r(3685),i=r(5687),a=r(2361),c=(r(9491),r(3837))
function u(e){var t=this
t.options=e||{},t.proxyOptions=t.options.proxy||{},t.maxSockets=t.options.maxSockets||o.Agent.defaultMaxSockets,t.requests=[],t.sockets=[],t.on("free",(function(e,r,n,s){for(var o=d(r,n,s),i=0,a=t.requests.length;i<a;++i){var c=t.requests[i]
if(c.host===o.host&&c.port===o.port)return t.requests.splice(i,1),void c.request.onSocket(e)}e.destroy(),t.removeSocket(e)}))}function l(e,t){var r=this
u.prototype.createSocket.call(r,e,(function(n){var o=e.request.getHeader("host"),i=f({},r.options,{socket:n,servername:o?o.replace(/:.*$/,""):e.host}),a=s.connect(0,i)
r.sockets[r.sockets.indexOf(n)]=a,t(a)}))}function d(e,t,r){return"string"==typeof e?{host:e,port:t,localAddress:r}:e}function f(e){for(var t=1,r=arguments.length;t<r;++t){var n=arguments[t]
if("object"==typeof n)for(var s=Object.keys(n),o=0,i=s.length;o<i;++o){var a=s[o]
void 0!==n[a]&&(e[a]=n[a])}}return e}t.httpOverHttp=function(e){var t=new u(e)
return t.request=o.request,t},t.httpsOverHttp=function(e){var t=new u(e)
return t.request=o.request,t.createSocket=l,t.defaultPort=443,t},t.httpOverHttps=function(e){var t=new u(e)
return t.request=i.request,t},t.httpsOverHttps=function(e){var t=new u(e)
return t.request=i.request,t.createSocket=l,t.defaultPort=443,t},c.inherits(u,a.EventEmitter),u.prototype.addRequest=function(e,t,r,n){var s=this,o=f({request:e},s.options,d(t,r,n))
s.sockets.length>=this.maxSockets?s.requests.push(o):s.createSocket(o,(function(t){function r(){s.emit("free",t,o)}function n(e){s.removeSocket(t),t.removeListener("free",r),t.removeListener("close",n),t.removeListener("agentRemove",n)}t.on("free",r),t.on("close",n),t.on("agentRemove",n),e.onSocket(t)}))},u.prototype.createSocket=function(e,t){var r=this,s={}
r.sockets.push(s)
var o=f({},r.proxyOptions,{method:"CONNECT",path:e.host+":"+e.port,agent:!1,headers:{host:e.host+":"+e.port}})
e.localAddress&&(o.localAddress=e.localAddress),o.proxyAuth&&(o.headers=o.headers||{},o.headers["Proxy-Authorization"]="Basic "+new Buffer(o.proxyAuth).toString("base64")),n("making CONNECT request")
var i=r.request(o)
function a(o,a,c){var u
return i.removeAllListeners(),a.removeAllListeners(),200!==o.statusCode?(n("tunneling socket could not be established, statusCode=%d",o.statusCode),a.destroy(),(u=new Error("tunneling socket could not be established, statusCode="+o.statusCode)).code="ECONNRESET",e.request.emit("error",u),void r.removeSocket(s)):c.length>0?(n("got illegal response body from proxy"),a.destroy(),(u=new Error("got illegal response body from proxy")).code="ECONNRESET",e.request.emit("error",u),void r.removeSocket(s)):(n("tunneling connection has established"),r.sockets[r.sockets.indexOf(s)]=a,t(a))}i.useChunkedEncodingByDefault=!1,i.once("response",(function(e){e.upgrade=!0})),i.once("upgrade",(function(e,t,r){process.nextTick((function(){a(e,t,r)}))})),i.once("connect",a),i.once("error",(function(t){i.removeAllListeners(),n("tunneling socket could not be established, cause=%s\n",t.message,t.stack)
var o=new Error("tunneling socket could not be established, cause="+t.message)
o.code="ECONNRESET",e.request.emit("error",o),r.removeSocket(s)})),i.end()},u.prototype.removeSocket=function(e){var t=this.sockets.indexOf(e)
if(-1!==t){this.sockets.splice(t,1)
var r=this.requests.shift()
r&&this.createSocket(r,(function(e){r.request.onSocket(e)}))}},n=process.env.NODE_DEBUG&&/\btunnel\b/.test(process.env.NODE_DEBUG)?function(){var e=Array.prototype.slice.call(arguments)
"string"==typeof e[0]?e[0]="TUNNEL: "+e[0]:e.unshift("TUNNEL:"),console.error.apply(console,e)}:function(){},t.debug=n},2277:(e,t,r)=>{"use strict"
r.r(t),r.d(t,{NIL:()=>O,parse:()=>v,stringify:()=>d,v1:()=>g,v3:()=>w,v4:()=>E,v5:()=>b,validate:()=>u,version:()=>_})
var n=r(6113),s=r.n(n)
const o=new Uint8Array(256)
let i=o.length
function a(){return i>o.length-16&&(s().randomFillSync(o),i=0),o.slice(i,i+=16)}const c=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i
const u=function(e){return"string"==typeof e&&c.test(e)},l=[]
for(let e=0;e<256;++e)l.push((e+256).toString(16).substr(1))
const d=function(e,t=0){const r=(l[e[t+0]]+l[e[t+1]]+l[e[t+2]]+l[e[t+3]]+"-"+l[e[t+4]]+l[e[t+5]]+"-"+l[e[t+6]]+l[e[t+7]]+"-"+l[e[t+8]]+l[e[t+9]]+"-"+l[e[t+10]]+l[e[t+11]]+l[e[t+12]]+l[e[t+13]]+l[e[t+14]]+l[e[t+15]]).toLowerCase()
if(!u(r))throw TypeError("Stringified UUID is invalid")
return r}
let f,h,p=0,m=0
const g=function(e,t,r){let n=t&&r||0
const s=t||new Array(16)
let o=(e=e||{}).node||f,i=void 0!==e.clockseq?e.clockseq:h
if(null==o||null==i){const t=e.random||(e.rng||a)()
null==o&&(o=f=[1|t[0],t[1],t[2],t[3],t[4],t[5]]),null==i&&(i=h=16383&(t[6]<<8|t[7]))}let c=void 0!==e.msecs?e.msecs:Date.now(),u=void 0!==e.nsecs?e.nsecs:m+1
const l=c-p+(u-m)/1e4
if(l<0&&void 0===e.clockseq&&(i=i+1&16383),(l<0||c>p)&&void 0===e.nsecs&&(u=0),u>=1e4)throw new Error("uuid.v1(): Can't create more than 10M uuids/sec")
p=c,m=u,h=i,c+=122192928e5
const g=(1e4*(268435455&c)+u)%4294967296
s[n++]=g>>>24&255,s[n++]=g>>>16&255,s[n++]=g>>>8&255,s[n++]=255&g
const v=c/4294967296*1e4&268435455
s[n++]=v>>>8&255,s[n++]=255&v,s[n++]=v>>>24&15|16,s[n++]=v>>>16&255,s[n++]=i>>>8|128,s[n++]=255&i
for(let e=0;e<6;++e)s[n+e]=o[e]
return t||d(s)}
const v=function(e){if(!u(e))throw TypeError("Invalid UUID")
let t
const r=new Uint8Array(16)
return r[0]=(t=parseInt(e.slice(0,8),16))>>>24,r[1]=t>>>16&255,r[2]=t>>>8&255,r[3]=255&t,r[4]=(t=parseInt(e.slice(9,13),16))>>>8,r[5]=255&t,r[6]=(t=parseInt(e.slice(14,18),16))>>>8,r[7]=255&t,r[8]=(t=parseInt(e.slice(19,23),16))>>>8,r[9]=255&t,r[10]=(t=parseInt(e.slice(24,36),16))/1099511627776&255,r[11]=t/4294967296&255,r[12]=t>>>24&255,r[13]=t>>>16&255,r[14]=t>>>8&255,r[15]=255&t,r}
function y(e,t,r){function n(e,n,s,o){if("string"==typeof e&&(e=function(e){e=unescape(encodeURIComponent(e))
const t=[]
for(let r=0;r<e.length;++r)t.push(e.charCodeAt(r))
return t}(e)),"string"==typeof n&&(n=v(n)),16!==n.length)throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)")
let i=new Uint8Array(16+e.length)
if(i.set(n),i.set(e,n.length),i=r(i),i[6]=15&i[6]|t,i[8]=63&i[8]|128,s){o=o||0
for(let e=0;e<16;++e)s[o+e]=i[e]
return s}return d(i)}try{n.name=e}catch(e){}return n.DNS="6ba7b810-9dad-11d1-80b4-00c04fd430c8",n.URL="6ba7b811-9dad-11d1-80b4-00c04fd430c8",n}const w=y("v3",48,(function(e){return Array.isArray(e)?e=Buffer.from(e):"string"==typeof e&&(e=Buffer.from(e,"utf8")),s().createHash("md5").update(e).digest()}))
const E=function(e,t,r){const n=(e=e||{}).random||(e.rng||a)()
if(n[6]=15&n[6]|64,n[8]=63&n[8]|128,t){r=r||0
for(let e=0;e<16;++e)t[r+e]=n[e]
return t}return d(n)}
const b=y("v5",80,(function(e){return Array.isArray(e)?e=Buffer.from(e):"string"==typeof e&&(e=Buffer.from(e,"utf8")),s().createHash("sha1").update(e).digest()})),O="00000000-0000-0000-0000-000000000000"
const _=function(e){if(!u(e))throw TypeError("Invalid UUID")
return parseInt(e.substr(14,1),16)}},9491:e=>{"use strict"
e.exports=require("assert")},2081:e=>{"use strict"
e.exports=require("child_process")},6113:e=>{"use strict"
e.exports=require("crypto")},2361:e=>{"use strict"
e.exports=require("events")},7147:e=>{"use strict"
e.exports=require("fs")},3685:e=>{"use strict"
e.exports=require("http")},5687:e=>{"use strict"
e.exports=require("https")},1808:e=>{"use strict"
e.exports=require("net")},6005:e=>{"use strict"
e.exports=require("node:crypto")},7561:e=>{"use strict"
e.exports=require("node:fs")},3977:e=>{"use strict"
e.exports=require("node:fs/promises")},2286:e=>{"use strict"
e.exports=require("node:https")},612:e=>{"use strict"
e.exports=require("node:os")},9411:e=>{"use strict"
e.exports=require("node:path")},7742:e=>{"use strict"
e.exports=require("node:process")},6465:e=>{"use strict"
e.exports=require("node:stream/consumers")},6402:e=>{"use strict"
e.exports=require("node:stream/promises")},7261:e=>{"use strict"
e.exports=require("node:util")},2037:e=>{"use strict"
e.exports=require("os")},1017:e=>{"use strict"
e.exports=require("path")},2781:e=>{"use strict"
e.exports=require("stream")},1576:e=>{"use strict"
e.exports=require("string_decoder")},9512:e=>{"use strict"
e.exports=require("timers")},4404:e=>{"use strict"
e.exports=require("tls")},6224:e=>{"use strict"
e.exports=require("tty")},3837:e=>{"use strict"
e.exports=require("util")}},t={}
function r(n){var s=t[n]
if(void 0!==s)return s.exports
var o=t[n]={exports:{}}
return e[n].call(o.exports,o,o.exports,r),o.exports}r.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e
return r.d(t,{a:t}),t},r.d=(e,t)=>{for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}
r(4470)})()
