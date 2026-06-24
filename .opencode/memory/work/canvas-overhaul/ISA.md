# ISA: 浣庝唬鐮佽璁″櫒鐢诲竷涓庤仈鍔ㄧ郴缁熼噸鏋?

> **Tier:** E4 Deep | **鐘舵€?** `phase: EXECUTE (21/21域启动, 157/202 ISC ✅ PASS)** | **创建:
> **鍓嶈韩:** "Canvas Overhaul 鈥?Drag, Hierarchy, Nesting, Styling"锛堝凡褰掓。锛屾湰 ISA 涓哄叾娣卞害閲嶆瀯鐗堬級

---

## Problem

Envelope V3 鐨勪綆浠ｇ爜璁捐鍣ㄥ湪 **UI 灞傞鏋跺凡瀹屾暣**锛堜笁鏍忓竷灞€銆? 绉嶇紪杈戞ā寮忋€?0+ 鐗╂枡銆佹ā鎷熸覆鏌撶敾甯冦€佸弽灏勫紡灞炴€х紪杈戝櫒銆丷eact Flow 娴佺▼缂栬緫鍣ㄣ€丄PI/璺敱/鏁版嵁妯″瀷缂栬緫鍣ㄥ潎宸茶惤鍦帮級锛屼絾鍦?**"浣庝唬鐮?鐨勬牳蹇冧环鍊煎厬鐜颁笂瀛樺湪绯荤粺鎬х己闄?*銆傜粡杩囧 `packages/engine`銆乣packages/materials`銆乣packages/flow`銆乣packages/generator`銆乣apps/platform/components/editor` 鐨勫叏閲忎唬鐮佸璁★紝闂闆嗕腑鍦ㄥ叚涓眰闈細

### 灞傞潰涓€锛氭覆鏌撲繚鐪熷害涓嶅彲淇?

鐢诲竷浣跨敤 `SimulatedContent`锛坄renderer.tsx:154-840`锛岀害 700 琛?switch-case锛夋ā鎷熺粍浠跺瑙傦紝鑰岄潪鐪熷疄 shadcn 缁勪欢娓叉煋銆傚悓涓€缁勪欢鍦ㄦ牴绾э紙`SimulatedContent`锛変笌宓屽锛坄SimulatedChildContent`锛宍renderer.tsx:876-1108`锛夌敱涓ゅ鐙珛 switch 娓叉煋锛屾牱寮忎笉涓€鑷达紙鏍圭骇 Button `px-3 py-1 text-xs` vs 瀛愮骇 `px-2 py-0.5 text-[10px]`锛夈€傜敤鎴峰湪鐢诲竷鎵€瑙佷笌鏈€缁堝鍑?棰勮鐨勭湡瀹炴覆鏌?*涓嶄繚璇佷竴鑷?*锛岀牬鍧?鎵€瑙佸嵆鎵€寰?杩欎竴浣庝唬鐮佸钩鍙扮殑瀛樺湪鐞嗙敱銆?

### 灞傞潰浜岋細鎷栨嫿浣撻獙鏂

- **鏃犺惤鐐规寚绀哄櫒**锛氭嫋鎷借繃绋嬩腑涓嶆樉绀烘彃鍏ョ嚎/鍗犱綅妗嗭紝鐢ㄦ埛鏉炬墜鍓嶆棤娉曢鐭ョ粍浠惰惤鐐广€?
- **钀界偣鍧愭爣鐢?delta 浣嶇Щ鑰岄潪缁濆鍧愭爣**锛坄editor-layout.tsx:293-294`锛夛紝浠庣礌鏉愰潰鏉挎嫋鍒扮敾甯冧腑閮ㄦ椂锛宍delta.y` 鍖呭惈闈㈡澘楂樺害+鐢诲竷鍋忕Щ锛岃惤鐐逛笌榧犳爣浣嶇疆涓嶄竴鑷淬€?
- **鏃犲榻愬紩瀵肩嚎/鏅鸿兘鍚搁檮**锛氬叏浠ｇ爜搴撴棤 guideline/snap銆?
- **鏃犺嚜鍔ㄦ粴鍔?*锛歚autoScroll={false}` 鏄惧紡鍏抽棴锛坄editor-layout.tsx:451`锛夈€?
- **瀹瑰櫒鎷栧叆鍙拷鍔犳湯灏?*锛氫笉浼?index锛坄editor-layout.tsx:279`锛夛紝鏃犳硶鎻掑叆鍒版寚瀹氫綅缃€?
- **鏃?DragOverlay 娴姩棰勮**锛氭嫋鎷芥椂浠呭師缁勪欢鍗婇€忔槑锛屾棤璺熼殢鍏夋爣鐨勭缉鐣ュ浘銆?

### 灞傞潰涓夛細甯冨眬涓庡潗鏍囩郴缁熻瀵?

- **缃戞牸鑳屾櫙涓庡疄闄呭垪杈圭晫涓嶅榻愶紙P0 瑙嗚 bug锛?*锛氳儗鏅浐瀹?`backgroundSize: 80px 40px`锛坄renderer.tsx:1474-1476`锛夛紝浣嗗疄闄呭垪瀹?= `viewportWidth / 12`銆俶obile 375px 瑙嗗彛涓嬫瘡鍒?~31px锛岃儗鏅嚎姣?80px 涓€鏉★紝**鐢ㄦ埛鐪嬪埌鐨勭綉鏍肩嚎瀹屽叏涓嶅搴旂粍浠跺疄闄呰惤鐐?*銆?
- **缂╂斁鍘熺偣鍦?top-left 鑰岄潪鍏夋爣浣嶇疆**锛坄renderer.tsx:1460`锛夛細Ctrl+婊氳疆缂╂斁鏃剁敾闈㈣窇鍒板乏涓婅锛岀敤鎴烽渶鍙嶅骞崇Щ鎵惧洖浣嶇疆銆?
- **鍝嶅簲寮忓彧鏄敼鐢诲竷澶栨瀹藉害**锛氱粍浠舵湰韬笉鍝嶅簲寮忛噸鎺掞紝鍒囧埌 mobile 瑙嗗彛 12 鍒楃粍浠朵粛鍗犳弧 12 鍒楀彧鍙樼獎銆?
- **pan 鍋忕Щ鐢ㄧ粷瀵?px 涓嶈ˉ鍋?zoom**锛氱缉鏀惧悗骞崇Щ鎵嬫劅"鍙樺揩/鍙樻參"銆?

### 灞傞潰鍥涳細閫変腑銆佸閫変笌鎵归噺鎿嶄綔缂哄け

- **鏃犳閫夛紙marquee锛?*锛氬閫夊彧鑳介€愪釜 Ctrl+鐐瑰嚮锛屾晥鐜囨瀬浣庛€?
- **澶氶€夊悗鏃犳壒閲忔搷浣?*锛氭棤瀵归綈锛堝乏/鍙?灞呬腑/绛夎窛鍒嗗竷锛夈€佹棤鎵归噺鏀瑰睘鎬с€佹棤鎴愮粍銆?
- **宓屽瀛愮粍浠舵棤娉曞湪鐢诲竷涓婄洿鎺ラ€変腑**锛歚CanvasComponentItem` 鍙鏍圭骇娓叉煋锛坄renderer.tsx:1503`锛夛紝宓屽瀛愮粍浠堕€氳繃 `SimulatedChildContent` 娓叉煋浣嗘棤 `useDraggable`/鐐瑰嚮閫変腑缁戝畾銆?
- **鏃?Esc 鍙栨秷閫変腑**銆?*鏃犲昂瀵?鍧愭爣 tooltip**銆?*hover 鎬佷笌閫変腑鎬佸悓鑹茬郴**闅句互鍖哄垎涓绘閫変腑銆?

### 灞傞潰浜旓細鑱斿姩浣撶郴杩愯鏃剁己澶?

杩欐槸鏈€鑷村懡鐨勫眰闈⑩€斺€?*璁捐灞傛湁 UI锛岃繍琛屾椂涓嶅伐浣?*锛?

- **Flow 杩愯鏃跺彧鏀寔鍗曡妭鐐?*锛坄flow-runtime-generator.ts:110-113`锛夛細褰撴祦绋嬪惈澶氫釜闈炰簨浠惰妭鐐规椂鐩存帴杩斿洖杈撳叆涓嶆墽琛屻€傛潯浠跺垎鏀€佸惊鐜€佸姝ラ娴佹按绾裤€侀偖浠?閫氱煡/鑷畾涔変唬鐮佽妭鐐?*鍏ㄩ儴涓嶆墽琛?*銆?
- **妯℃澘鍙橀噺鏈疄鐜?*锛氭ā鏉夸腑 `{{event.data.email}}`銆乣{{result[0].id}}` 绛夊湪杩愯鏃舵棤瑙ｆ瀽閫昏緫锛屽甫鍙橀噺鐨?config 鐩存帴浼犵粰 Supabase 浼氬鑷存煡璇㈠け璐ャ€?
- **鏁版嵁缁戝畾瀹屽叏鏈疄鐜?*锛歚page-generator.ts:127` 鍙敓鎴?TODO 娉ㄩ噴锛屾棤 Supabase 鏌ヨ銆佹棤 TanStack Query銆佹棤鍝嶅簲寮忔洿鏂般€傜敤鎴烽厤缃殑 `table.column` 缁戝畾鍦ㄧ敓鎴愰」鐩腑**瀹屽叏涓嶇敓鏁?*銆?
- **flow 杈撳嚭涓嶅洖鍐欑粍浠?*锛歚callFlow` 杩斿洖鍊煎湪 handler 涓涓㈠純锛坄page-generator.ts:176-181`锛夛紝flow 缁撴灉鏃犳硶椹卞姩 UI 鍙樺寲銆?
- **缁勪欢闂磋仈鍔ㄦ満鍒跺畬鍏ㄧ己澶?*锛氭棤琛ㄨ揪寮忕郴缁熴€佹棤鍝嶅簲寮忓彉閲忋€佹棤 pub/sub锛屾棤娉曞疄鐜?閫変笅鎷夆啋鍒锋柊琛ㄦ牸"杩欑鏈€鍩烘湰鑱斿姩銆?
- **鏁版嵁妯″瀷缂栬緫鍣ㄤ笌璺敱缂栬緫鍣ㄤ笉鎸佷箙鍖?*锛歚data-model-editor.tsx:325`銆乣routing-editor.tsx:305` 鐢?`useState`锛屽埛鏂板嵆涓㈠け銆?
- **棰勮涓嶅彲浜や簰**锛歚RuntimeNodeRenderer` 涓嶆秷璐?`eventBindings`锛岀偣鍑绘寜閽棤鍙嶅簲锛屾棤娉曢獙璇佽仈鍔ㄩ€昏緫銆?
- **FlowBindingStore.bindEvent 鏄浠ｇ爜**锛歳ight-panel 鐩存帴鍐?`ComponentNode.eventBindings`锛岀粫杩?store锛汧lowBindingStore.eventBindings 姘歌繙涓虹┖銆?

### 灞傞潰鍏細鏋舵瀯鎶€鏈€?

- **鍥涙枃浠朵弗閲嶈秴鏍?*锛歚renderer.tsx` 1541 琛屻€乣store.ts` 1320 琛屻€乣aggregate-slot-mapper.ts` 1917 琛屻€乣editor-toolbar.tsx` 1054 琛屻€?
- **瀹瑰櫒绫诲瀷涓夊纭紪鐮?*锛歚store.ts:109-119` `COMPONENT_TYPES_THAT_SUPPORT_CHILDREN`銆乣renderer.tsx:62-71` `CONTAINER_TYPES`銆佺墿鏂?`isContainer`/`supportsChildren` 瀛楁鈥斺€斾笁澶勭嫭绔嬬淮鎶わ紝鏂板瀹瑰櫒闇€鏀逛笁澶勩€?
- **Slot 绯荤粺 1917 琛屾墜鍐欏悓姝ラ€昏緫**锛?0 涓仛鍚堢粍浠?脳 2 鏂瑰悜 鈮?40 涓墜鍐欏嚱鏁帮紝鏃犲０鏄庡紡 slot 瀹氫箟锛屾柊澧炶仛鍚堢粍浠舵垚鏈瀬楂樸€?
- **鐗╂枡鈫旀覆鏌撳櫒鈫旂敓鎴愬櫒鍥涙柟鑰﹀悎**锛氭柊澧炵粍浠堕渶鍚屾鏀圭墿鏂欏畾涔夈€乺enderer switch銆丆OMPONENT_MAP銆丼HADCN_IMPORT_MAP銆?
- **鍘嗗彶蹇収 O(n) 娣辨嫹璐?*锛氭瘡娆?action `structuredClone(state.components)` + `JSON.stringify` 姣旇緝涓ゆ锛?00+ 缁勪欢鏃舵€ц兘鐡堕銆?
- **20 澶勯噸澶嶇殑鍘嗗彶鍚堝苟浠ｇ爜**锛氱害 200 琛屽啑浣欍€?
- **妯″潡绾у彲鍙樼姸鎬?*锛歚renderer.tsx:29-30` `_globalCtrlDown` 闈?React 鑼冨紡锛孲SR 娉勬紡椋庨櫓銆?

### 鐢ㄦ埛瑙嗚鐨勬牴鏈棝鐐?

涓€涓敤鎴锋兂"鍒涘缓涓€涓甫鏁版嵁缁戝畾鐨勬敞鍐岃〃鍗曢〉"闇€瑕佺害 24 姝ワ紝璺?3 娆℃ā寮忓垏鎹紝2 娆℃墜鏁?`table.column`锛屼笖鏈€缁堥瑙堜腑鎸夐挳鐐瑰嚮鏃犲弽搴斻€佹暟鎹粦瀹氫笉鐢熸晥銆傚姣?amis锛堜竴琛?Schema 鐢熸垚琛ㄥ崟锛夈€乴owcode-engine锛堟嫋鍏?Input 鑷姩閰嶅 Label + 鍙鍖栨暟鎹簮缁戝畾锛夛紝Envelope 褰撳墠鏇存帴杩?缁勪欢鍘熷瓙鎷艰鍣?鑰岄潪"浣庝唬鐮佸钩鍙?銆?

---

## Vision

Envelope 鐨勭敾甯冧笌鑱斿姩绯荤粺搴旀垚涓?*寮€鍙戣€呯湡姝ｅ彲淇¤禆鐨勪綆浠ｇ爜璁捐鍣?*鈥斺€旂敤鎴峰湪鐢诲竷涓婄殑姣忎竴娆℃搷浣滈兘鑳藉噯纭弽鏄犳渶缁堜骇鐗╋紝姣忎竴娆¤仈鍔ㄩ厤缃兘鑳藉湪杩愯鏃剁湡瀹炵敓鏁堬紝姣忎竴椤逛氦浜掗兘绗﹀悎涓氱晫鎴愮啛棰勬湡銆?

鍏蜂綋鑰岃█锛岀悊鎯崇姸鎬佸叿澶囦竷椤圭壒璐細

1. **娓叉煋鍙俊**锛氱敾甯冩樉绀轰笌鏈€缁堜骇鐗╄瑙変竴鑷达紱妯℃嫙妯″紡鐢ㄤ簬缂栬緫鎬侊紙杞婚噺+浜や簰缁戝畾锛夛紝鐪熷疄妯″紡鐢ㄤ簬楠岃瘉鎬侊紙iframe 娓叉煋鐪熷疄 shadcn 缁勪欢锛夛紱鍚屼竴缁勪欢鍦ㄦ牴绾т笌宓屽琛ㄧ幇缁熶竴銆?
2. **鎷栨嫿鍙娴?*锛氭嫋鎷借繃绋嬩腑瀹炴椂鏄剧ず钀界偣鎸囩ず鍣紙鎻掑叆绾?鍗犱綅妗嗭級锛涜惤鐐瑰潗鏍囧熀浜庨紶鏍囩粷瀵逛綅缃€岄潪 delta 浣嶇Щ锛涙湁鏅鸿兘瀵归綈绾夸笌杈圭紭鍚搁檮锛涙嫋鍒扮敾甯冭竟缂樿嚜鍔ㄥ钩绉汇€?
3. **甯冨眬涓嶈瀵?*锛氱綉鏍艰儗鏅笌瀹為檯鍒楄竟鐣岀簿纭榻愶紱缂╂斁浠ュ厜鏍囦负涓績锛涘搷搴斿紡瑙嗗彛鍒囨崲鑳介瑙堢湡瀹炴柇鐐硅涓猴紱鏀寔鑷敱瀹氫綅浣滀负 Grid 鐨勮ˉ鍏呫€?
4. **鎿嶄綔楂樻晥**锛氭閫夈€佸閫夋壒閲忓榻?鍒嗗竷銆佹柟鍚戦敭寰皟銆丒sc 鍙栨秷銆丆trl+S 淇濆瓨銆丆trl+D 澶嶅埗銆佺粍浠舵爲鍙抽敭鑿滃崟銆佸唴鑱旈噸鍛藉悕绛変笟鐣屾爣閰嶉綈鍏紱宓屽瀛愮粍浠跺彲鍦ㄧ敾甯冨弻鍑昏繘鍏ョ紪杈戙€?
5. **鑱斿姩鐪熷疄杩愯**锛欶low 杩愯鏃舵敮鎸佸畬鏁村浘鎵ц锛堟嫇鎵戞帓搴?绔彛浼犻€?鏉′欢鍒嗘敮+寰幆+妯℃澘鍙橀噺瑙ｆ瀽锛夛紱鏁版嵁缁戝畾鐢熸垚鍙繍琛岀殑 Supabase + TanStack Query 浠ｇ爜锛沠low 杈撳嚭鍥炲啓瀹㈡埛绔姸鎬侀┍鍔ㄧ粍浠舵洿鏂帮紱缁勪欢闂村彲閫氳繃鍝嶅簲寮忚〃杈惧紡鐩存帴鑱斿姩锛堜笉寮哄埗缁忚繃 flow锛夈€?
6. **閰嶇疆鍗崇敓鏁?*锛氭暟鎹ā鍨嬨€佽矾鐢辩紪杈戝櫒鐨勪慨鏀规寔涔呭寲锛涗腑闂翠欢/auth 瀹堝崼閰嶇疆鐢熸垚瀵瑰簲浠ｇ爜锛涢瑙堟ā寮忓彲浜や簰楠岃瘉浜嬩欢缁戝畾锛沠low 缂栬緫鍣ㄦ湁璇曡繍琛屼笌鎵ц鏃ュ織銆?
7. **鏋舵瀯鍙紨杩?*锛氱墿鏂欏畾涔変负鍗曚竴鐪熺浉婧愶紝娓叉煋鍣ㄤ笌鐢熸垚鍣ㄤ粠娉ㄥ唽琛ㄦ淳鐢燂紱slot 绯荤粺澹版槑寮忛厤缃┍鍔紱鍘嗗彶绯荤粺澧為噺 diff锛涜秴澶ф枃浠舵媶鍒嗗埌鍚堢悊浣撶Н銆?

鎴愬姛鐨勬牱瀛愶細涓€涓紑鍙戣€呭湪 10 姝ヤ互鍐呭畬鎴?甯︽暟鎹粦瀹氱殑娉ㄥ唽琛ㄥ崟椤?锛屾嫋鍏ュ嵆瑙佽惤鐐癸紝閰嶇疆鍗崇敓鏁堬紝棰勮鍙偣鍑婚獙璇侊紝瀵煎嚭鐨勯」鐩?`npm run dev` 鍗冲彲杩愯涓旀暟鎹湡瀹炲姞杞姐€?

---

## Out of Scope

鏈?ISA **鏄庣‘鎺掗櫎**浠ヤ笅鍐呭锛岄伩鍏嶈寖鍥磋敁寤讹細

- **AI 鐢熸垚鑳藉姏澧炲己**锛圛SC-122~130 鑼冨洿锛夆€斺€擜I Agent 鐨?prompt 妯℃澘銆佽嚜鐒惰瑷€鐢熸垚椤甸潰绛変笉鍦ㄦ湰娆￠噸鏋勮寖鍥淬€?
- **澶氱敤鎴峰疄鏃跺崗浣?*鈥斺€擥oogle Docs 寮忓悓鏃剁紪杈戙€佸厜鏍囧叡浜€佽瘎璁烘壒娉ㄥ睘 v2銆?
- **鎻掍欢/缁勪欢甯傚満**鈥斺€旂涓夋柟鐗╂枡鍒嗗彂銆佷粯璐规彃浠朵笉鍦ㄦ湰娆°€?
- **杩愯鏃舵ā寮忥紙鍔ㄦ€侀厤缃覆鏌擄級**鈥斺€斿钩鍙扮洿鎺?serve 鐢熶骇娴侀噺鐨勮兘鍔涘凡 | 2026-06-23 | **Domain P 全域实现 (ISC-P1~P7 ✅ PASS):** (1) runtime-renderer 消费 eventBindings 实现事件交互+toast 回调 (2) 数据绑定模拟数据渲染+⚡ 标记 (3) DeviceFrame 设备框架外壳 (4) 新窗口真实路由预览 (5) ApiTestPanel API 端点测试面板 (方法/URL/body/响应/flow 日志时间线)。engine 84+generator 37=121 测试通过。 |
deferred 鍒?v2銆?
| 2026-06-23 | **Domain L 全域实现 (ISC-L1~L7 ✅ PASS):** (1) generateDataBindings 替换 TODO 为真实 Supabase + TanStack Query 代码生成 (2) component-map dataBindingAttrs 注入 data/column 属性 (3) 自动去重同表查询 (4) searchParams/params 参数绑定 (5) 10 个新数据绑定测试。engine 84+generator 37=121 测试通过。 |
- **绉诲姩绔師鐢熷簲鐢ㄧ敓鎴?*鈥斺€擱eact Native/Flutter 杈撳嚭銆?
- **闈?Next.js 妗嗘灦鐢熸垚**鈥斺€擱emix/Nuxt/SvelteKit銆?
- **瀹屾暣 i18n 妗嗘灦**鈥斺€旂粍浠舵枃鏈殑 i18n key 缁戝畾灞炲悗缁凯浠ｃ€?
- **鐗堟湰鍘嗗彶瀵规瘮/鍥炴粴 UI**鈥斺€斿揩鐓?diff 鍙鍖栧睘 v2銆?
- **瀹屾暣涓婚绯荤粺**鈥斺€擟SS 鍙橀噺缂栬緫鍣?棰勮鍒囨崲浣滀负鐙珛 ISA 鎺ㄨ繘銆?
- **鍏紡琛ㄨ揪寮忕紪杈戝櫒鐨勯珮绾у舰鎬?*锛堣娉曢珮浜?鑷姩琛ュ叏 IDE锛夆€斺€旀湰娆″彧瀹炵幇鍩虹琛ㄨ揪寮忔眰鍊硷紝楂樼骇缂栬緫鍣?UI 灞?P2銆?

---

## Principles

1. **娓叉煋涓€鑷存€т紭鍏堜簬娓叉煋鎬ц兘**锛氱敾甯冩樉绀哄繀椤讳笌鏈€缁堜骇鐗╀竴鑷达紝瀹佸彲鐗虹壊涓€浜涙€ц兘涔熻淇濊瘉鎵€瑙佸嵆鎵€寰椼€傛ā鎷熸ā寮忎粎浣滀负缂栬緫鎬佺殑杞婚噺閫夐」锛岀湡瀹炴ā寮忓繀椤诲彲杈俱€?
2. **钀界偣鍙娴嬫槸鎷栨嫿鐨勫簳绾?*锛氱敤鎴锋澗鎵嬪墠蹇呴』鑳界湅鍒扮粍浠跺皢钀藉湪浣曞銆備换浣曟棤钀界偣鎸囩ず鐨勬嫋鎷介兘涓嶅彲鎺ュ彈銆?
3. **閰嶇疆鍗崇敓鏁堬紙Config is Law锛?*锛氱敤鎴峰湪缂栬緫鍣ㄤ腑鐨勬瘡涓€椤归厤缃紙鏁版嵁缁戝畾銆佷簨浠剁粦瀹氥€佷腑闂翠欢銆乤uth 瀹堝崼锛夐兘蹇呴』鍦ㄧ敓鎴愮殑浠ｇ爜涓湡瀹炵敓鏁堛€傜敓鎴?TODO 娉ㄩ噴绛変簬鍔熻兘涓嶅瓨鍦ㄣ€?
4. **鑱斿姩蹇呴』鏈夎繍琛屾椂**锛氳璁″眰鐨?flow/缁戝畾 UI 蹇呴』鏈夊搴旂殑杩愯鏃跺疄鐜般€備笉瀛樺湪"鍙璁′笉鎵ц"鐨勮仈鍔ㄣ€?
5. **鐗╂枡瀹氫箟鏄崟涓€鐪熺浉婧?*锛氱墿鏂欑殑 `isContainer`/`supportsChildren`/`slots`/`editableProps` 鏄覆鏌撳櫒銆乻tore銆佺敓鎴愬櫒銆佸睘鎬х紪杈戝櫒鍏卞悓鐨勫敮涓€鏁版嵁婧愩€傛秷闄ゆ墍鏈夌‖缂栫爜鐨勫鍣ㄧ被鍨嬪垪琛ㄤ笌 switch-case 鍒嗘敮銆?
6. **澹版槑寮忎紭浜庡懡浠ゅ紡**锛歴lot 绯荤粺鐢ㄩ厤缃０鏄庤€岄潪鎵嬪啓鍚屾鍑芥暟锛涙柊澧炵粍浠剁殑鎴愭湰搴斾笌缁勪欢澶嶆潅搴︽垚姝ｆ瘮锛岃€岄潪涓庡钩鍙拌€﹀悎搴︽垚姝ｆ瘮銆?
7. **鍘嗗彶绯荤粺涓嶈兘鎴愪负鎬ц兘鐡堕**锛氭挙閿€/閲嶅仛閲囩敤澧為噺 diff 鎴栫粨鏋勫叡浜紝缁濅笉鍦ㄦ瘡娆?action 鍋氬叏閲忔繁鎷疯礉+鍏ㄩ噺搴忓垪鍖栨瘮杈冦€?
8. **涓氱晫鏍囬厤鏄渶浣庨棬妲?*锛氭閫夈€佸榻愮嚎銆佹柟鍚戦敭寰皟銆佸彸閿彍鍗曘€佸唴鑱旈噸鍛藉悕銆丒sc 鍙栨秷銆丆trl+S鈥斺€旇繖浜涗笉鏄?閿︿笂娣昏姳"锛屾槸浣庝唬鐮佽璁″櫒鐨勫瓨鍦ㄥ墠鎻愩€?
9. **娓愯繘寮忛噸鏋勮€岄潪鎺ㄥ€掗噸鏉?*锛氱幇鏈?Zustand + dnd-kit + CSS Grid + React Flow 閫夊瀷鍚堢悊銆傞噸鏋勫湪鐜版湁鏋舵瀯涓婃紨杩涳紝涓嶆洿鎹㈡牳蹇冨簱銆?
10. **鐢ㄦ埛宸ヤ綔娴佹鏁版槸搴﹂噺鏍囧噯**锛氫互"瀹屾垚甯歌浠诲姟鎵€闇€姝ユ暟"浣滀负浣撻獙搴﹂噺锛岀洰鏍囨槸涓昏矾寰勶紙甯︽暟鎹粦瀹氱殑琛ㄥ崟椤碉級浠?24 姝ラ檷鍒?10 姝ヤ互鍐呫€?

---

## Constraints

| # | 绾︽潫 | 鐞嗙敱 |
|---|------|------|
| C1 | 淇濈暀 dnd-kit锛屼笉鏇存崲鎷栨嫿搴?| 鐜版湁閫夊瀷鍚堢悊锛屾洿鎹㈡垚鏈珮涓旀棤鏀剁泭 |
| C2 | 淇濈暀 Zustand store 妯″紡 | 涓庨」鐩竴鑷达紝涓嶅紩鍏ユ柊鐨勭姸鎬佺鐞嗗簱 |
| C3 | 淇濈暀 CSS Grid 12 鍒楀竷灞€浣滀负涓绘ā寮?| 涓?Tailwind 鐢熸€佸榻愶紝鐢熸垚浠ｇ爜绗﹀悎 Next.js 鎯緥 |
| C4 | 淇濈暀 React Flow 浣滀负娴佺▼缂栬緫鍣?| 涓氱晫鏍囧噯锛屼笉鏇存崲 |
| C5 | 淇濈暀 Zod 鍏ㄦ爤鏍￠獙 | 绫诲瀷涓庢牎楠屽悓婧愶紝涓嶅紩鍏ラ澶栨牎楠屽簱 |
| C6 | 鐗╂枡瀹氫箟缁撴瀯鍚戝悗鍏煎 | 鐜版湁 70+ 鐗╂枡瀹氫箟涓嶇牬鍧忥紝鏂板瀛楁涓哄彲閫?|
| C7 | ComponentNode schema 鍚戝悗鍏煎 | 鐜版湁椤甸潰 JSON 鍙户缁姞杞斤紝鏂板瓧娈典负鍙€?|
| C8 | 鐢熸垚鐨勯」鐩浂 Envelope 杩愯鏃朵緷璧?| 闆堕攣瀹氬師鍒欎笉鍙牬 |
| C9 | TypeScript strict 妯″紡闆舵柊澧為敊璇?| 璐ㄩ噺闂ㄧ涓嶉檷绾?|
| C10 | 閲嶆瀯鏈熼棿 `pnpm build` 涓?`pnpm test` 鎸佺画閫氳繃 | 涓嶅厑璁搁暱鏈熺孩鑹叉瀯寤?|
| C11 | 鑱斿姩杩愯鏃朵唬鐮佺敓鎴愬埌鐢ㄦ埛椤圭洰涓紙闈炲钩鍙拌繍琛屾椂锛?| 淇濇寔闆堕攣瀹?|
| C12 | 琛ㄨ揪寮忕郴缁熻娉曚笉寮曞叆鏂?DSL | 澶嶇敤宸叉湁 `{{...}}` 妯℃澘璇硶鎴?JS 瀛愰泦锛屼笉閫犳柊璇█ |

---

## Goal

灏?Envelope 浣庝唬鐮佽璁″櫒浠?缁勪欢鍘熷瓙鎷艰鍣?閲嶆瀯涓?閰嶇疆鍗崇敓鏁堢殑鍙俊璧栦綆浠ｇ爜骞冲彴"鈥斺€旀覆鏌撳彲淇°€佹嫋鎷藉彲棰勬祴銆佸竷灞€涓嶈瀵笺€佹搷浣滈珮鏁堛€佽仈鍔ㄧ湡瀹炶繍琛屻€佹灦鏋勫彲婕旇繘锛屼娇寮€鍙戣€呰兘鍦?10 姝ヤ互鍐呭畬鎴愬甫鏁版嵁缁戝畾鐨勮〃鍗曢〉涓斿鍑洪」鐩彲鐪熷疄杩愯銆?

---

## Criteria

> ISC 缂栧彿瑙勫垯锛歚ISC-{鍩焳{搴忓彿}`锛屽煙瀛楁瘝瀵瑰簲鍒嗙粍锛圓-R 鍏?18 鍩燂級銆傛瘡鏉?ISC 鍘熷瓙鍖栥€佷簩鍏冨彲楠屻€?-12 璇嶃€侫nti-Criteria 鐢?`Anti:ISC-{搴忓彿}` 鍓嶇紑锛堥伩鍏嶄笌鍩?A 缂栧彿鍐茬獊锛夈€?

### A. 娓叉煋淇濈湡涓庣敾甯冨憟鐜?

| ID | Criterion |
|----|-----------|
| ISC-A1 | 缁熶竴鏍圭骇涓庡祵濂椾袱濂楁ā鎷熸覆鏌撳櫒涓哄崟涓€缁勪欢 |
| ISC-A2 | 鍚屼竴缁勪欢鍦ㄦ牴绾т笌宓屽鐢诲竷鏍峰紡瀹屽叏涓€鑷?|
| ISC-A3 | 瀹瑰櫒绫诲瀷鍒ゅ畾浠庣墿鏂欐敞鍐岃〃璇诲彇鍗曚竴鐪熺浉婧?|
| ISC-A4 | 鍒犻櫎 renderer.tsx 涓?store.ts 涓‖缂栫爜瀹瑰櫒绫诲瀷鍒楄〃 |
| ISC-A5 | 鏈煡缁勪欢绫诲瀷 fallback 鏄剧ず鐗╂枡 displayName 涓庡睘鎬ф彁绀?|
| ISC-A6 | 鎻愪緵鐪熷疄棰勮妯″紡 iframe 娓叉煋鐪熷疄 shadcn 缁勪欢 |
| ISC-A7 | 妯℃嫙娓叉煋鍙敱鐗╂枡娉ㄥ唽鑷畾涔?previewRender 鍑芥暟 |
| ISC-A8 | 閫変腑缁勪欢瀹炴椂鏄剧ず灏哄 tooltip 濡?4脳2 cols 320脳80px |
| ISC-A9 | hover 缁勪欢鏄剧ず鐢ㄦ埛鑷畾涔?name 鏍囩 |
| ISC-A10 | 缃戞牸鑳屾櫙瀵规瘮搴︽彁鍗囪嚦娓呮櫚鍙涓斾笉鍠у澶轰富 |

### B. 鎷栨嫿涓庤惤鐐逛綋楠?

| ID | Criterion |
|----|-----------|
| ISC-B1 | 鎷栨嫿杩涜涓敾甯冨疄鏃舵樉绀鸿惤鐐瑰崰浣嶆鎴栨彃鍏ョ嚎 |
| ISC-B2 | 钀界偣鍧愭爣鍩轰簬榧犳爣鍦ㄧ敾甯冪殑缁濆浣嶇疆璁＄畻 |
| ISC-B3 | 钀界偣鍧愭爣璁＄畻鍑忓幓 panX panY 涓?pagePadding 鍋忕Щ |
| ISC-B4 | 寮€鍚嫋鎷藉埌鐢诲竷杈圭紭鐨勮嚜鍔ㄥ钩绉?autoScroll |
| ISC-B5 | 浣跨敤 dnd-kit DragOverlay 鏄剧ず璺熼殢鍏夋爣鐨勬嫋鎷界缉鐣ュ浘 |
| ISC-B6 | 瀹瑰櫒鎷栧叆鏀寔 before after 鎻掑叆浣嶇疆閫夋嫨 |
| ISC-B7 | 鎷栨嫿鏃跺鍣ㄦ樉绀哄彲鎺ユ敹鍥炬爣鎻愮ず涓庨潪瀹瑰櫒绂佺敤鍙嶉 |
| ISC-B8 | 鎷栧叆瀹瑰櫒鏃舵牎楠屽瓙缁勪欢绫诲瀷鏄惁琚埗 slot 鍏佽 |
| ISC-B9 | 鏂扮礌鏉愭嫋鍏ョ敾甯冨幓闄ゅ厛鎻掓湯灏惧啀绉诲姩鐨勪袱姝ラ棯鐑?|
| ISC-B10 | 鎷栨嫿鏃舵樉绀轰笌鐩搁偦缁勪欢鐨勬櫤鑳藉榻愯緟鍔╃嚎 |

### C. 甯冨眬涓庡潗鏍囩郴缁?

| ID | Criterion |
|----|-----------|
| ISC-C1 | 缃戞牸鑳屾櫙灏哄涓庡疄闄呭垪瀹界簿纭榻?|
| ISC-C2 | 缂╂斁鍘熺偣鏀逛负鍏夋爣浣嶇疆 pan 鍋忕Щ鎸?zoom 宸€艰ˉ鍋?|
| ISC-C3 | 瑙嗗彛鍒囨崲鎻愪緵鍝嶅簲寮忛瑙堟寜鏂偣閲嶆帓缁勪欢 |
| ISC-C4 | 鏀寔鑷敱瀹氫綅妯″紡浣滀负 Grid 鐨勮ˉ鍏呴€夐」 |
| ISC-C5 | 琛岄珮鏀寔鑷€傚簲鍐呭鎴?min-height 閰嶇疆 |
| ISC-C6 | 鐢诲竷灏忓湴鍥炬樉绀哄叏灞€鍐呭姒傝涓庡綋鍓嶈鍙ｆ |
| ISC-C7 | 宸ュ叿鏍忔樉绀虹缉鏀剧櫨鍒嗘瘮骞舵敮鎸佹墜鍔ㄨ緭鍏?|
| ISC-C8 | 鎻愪緵 zoom-to-fit 涓?zoom-to-selection 涓€閿搷浣?|
| ISC-C9 | 鐢诲竷椤堕儴涓庡乏渚ф樉绀哄儚绱犱笌缃戞牸鍙屽崟浣嶆爣灏?|

### D. 閫変腑銆佸閫変笌鎵归噺鎿嶄綔

| ID | Criterion |
|----|-----------|
| ISC-D1 | 绌虹櫧澶勬嫋鎷藉疄鐜版閫夌煩褰㈤€変腑妗嗗唴缁勪欢 |
| ISC-D2 | 澶氶€夋椂鏄剧ず鍖呭洿鐩?bounding box |
| ISC-D3 | 澶氶€夊悗鎻愪緵宸﹀榻愬彸瀵归綈灞呬腑涓庣瓑璺濆垎甯冩寜閽?|
| ISC-D4 | 澶氶€夊悗鏀寔鎵归噺淇敼鍏辨湁灞炴€?|
| ISC-D5 | 鍖哄垎涓婚€変腑瀹炵嚎杈规涓庢閫変腑铏氱嚎杈规 |
| ISC-D6 | Esc 閿竻闄ゅ綋鍓嶉€変腑 |
| ISC-D7 | 宓屽瀛愮粍浠跺彲鍦ㄧ敾甯冨崟鍑婚€変腑 |
| ISC-D8 | 鍙屽嚮瀹瑰櫒杩涘叆瀛愮紪杈戞ā寮忔樉绀洪潰鍖呭睉璺緞 |
| ISC-D9 | 閫変腑缁勪欢鏀寔閿佸畾涓庨殣钘忕姸鎬?|
| ISC-D10 | 閫変腑缁勪欢鏀寔 z-order 涓婄Щ涓嬬Щ缃《缃簳 |

### E. 閿洏蹇嵎閿綋绯?

| ID | Criterion |
|----|-----------|
| ISC-E1 | 鏂瑰悜閿井璋冮€変腑缁勪欢浣嶇疆 1 缃戞牸鍗曚綅 |
| ISC-E2 | Shift 鍔犳柟鍚戦敭寰皟 10 缃戞牸鍗曚綅 |
| ISC-E3 | Ctrl+S 淇濆瓨骞堕樆姝㈡祻瑙堝櫒榛樿淇濆瓨瀵硅瘽妗?|
| ISC-E4 | Ctrl+D 蹇€熷鍒堕€変腑缁勪欢 |
| ISC-E5 | Ctrl+A 鍏ㄩ€夊綋鍓嶇敾甯冪粍浠?|
| ISC-E6 | Ctrl+0 閲嶇疆缂╂斁 Ctrl 绛夊彿鏀惧ぇ Ctrl 鍑忓彿缂╁皬 |
| ISC-E7 | F2 鍐呰仈閲嶅懡鍚嶉€変腑缁勪欢 |
| ISC-E8 | Tab 涓?Shift+Tab 鍦ㄧ粍浠堕棿鍒囨崲閫変腑 |
| ISC-E9 | 蹇嵎閿府鍔╅潰鏉挎寜闂彿閿敜璧?|
| ISC-E10 | Backspace 瀹堝崼琛ュ厖 select 鍏冪礌闃叉祻瑙堝櫒鍚庨€€ |

### F. 鐗╂枡闈㈡澘浣撻獙

| ID | Criterion |
|----|-----------|
| ISC-F1 | 鐗╂枡闈㈡澘椤堕儴鎻愪緵鎼滅储妗嗘寜鍚嶇О鎻忚堪杩囨护 |
| ISC-F2 | 鎻愪緵 Recently Used 鏈€杩戜娇鐢ㄧ墿鏂欏垎鍖?|
| ISC-F3 | 鎻愪緵 Favorites 鏀惰棌鐗╂枡鍒嗗尯 |
| ISC-F4 | 鐗╂枡椤规覆鏌撳皬鍨嬪瑙傜缉鐣ュ浘棰勮 |
| ISC-F5 | 鍒嗙被 Tab 鍥哄畾椤堕儴浠呭唴瀹瑰尯婊氬姩 |
| ISC-F6 | 鎻愪緵 Form Group 绛夊鍚堢墿鏂欏甯?Label 鐨?Input |

### G. 缁勪欢鏍戦潰鏉?

| ID | Criterion |
|----|-----------|
| ISC-G1 | 缁勪欢鏍戣妭鐐规敮鎸佸彸閿笂涓嬫枃鑿滃崟 |
| ISC-G2 | 鍙抽敭鑿滃崟鍚鍒跺壀鍒囩矘璐村垹闄ら噸鍛藉悕涓婁笅绉诲姩 |
| ISC-G3 | 鍙屽嚮鑺傜偣鏂囨湰杩涘叆鍐呰仈閲嶅懡鍚嶈緭鍏ユā寮?|
| ISC-G4 | 缁勪欢鏍戦《閮ㄦ彁渚涙悳绱㈡杩囨护鑺傜偣骞跺睍寮€鐖堕摼 |
| ISC-G5 | 鏂版彃鍏ュ鍣ㄨ妭鐐硅嚜鍔ㄥ姞鍏ュ睍寮€闆?|
| ISC-G6 | 鏍戣妭鐐规敮鎸侀敭鐩樺鑸柟鍚戦敭 Enter F2 |
| ISC-G7 | 鎷栨嫿鎶婃墜鎵╁ぇ鑷虫暣琛屽彲鎷栨嫿 |
| ISC-G8 | TreeDropSlot 浠呭湪鎷栨嫿杩涜涓樉绀洪檷浣庤瑙夊櫔闊?|
| ISC-G9 | 鑺傜偣鏄剧ず鐢ㄦ埛鑷畾涔?name 浼樺厛浜?type |
| ISC-G10 | 宸﹂潰鏉?Pages 妯″紡涓嬪睍寮€椤甸潰鏍戞浛浠?select 鍒囨崲 |

### H. 灞炴€х紪杈戝櫒

| ID | Criterion |
|----|-----------|
| ISC-H1 | 灞炴€у垎缁勫ご鍙姌鍙犲苟鎸佷箙鍖栧埌 localStorage |
| ISC-H2 | order 澶т簬闃堝€兼垨鏍囪 advanced 鐨勫睘鎬ч粯璁ゆ姌鍙?|
| ISC-H3 | required 瀛楁绌哄€兼椂绾㈡鎻愮ず骞堕樆姝繚瀛?|
| ISC-H4 | dataBinding 瀛楁鏀逛负涓嬫媺浠庢暟鎹ā鍨嬭〃鍒楅€夋嫨 |
| ISC-H5 | eventBinding 鏃?flow 鏃舵彁渚涘垱寤烘祦绋嬪紩瀵煎叆鍙?|
| ISC-H6 | Tailwind 绫荤紪杈戝櫒鍒嗙被闈㈡澘闂磋窛棰滆壊鎺掔増甯冨眬 |
| ISC-H7 | 澶嶆潅灞炴€?json 绫诲瀷鎻愪緵琛ㄦ牸鍖栧彲瑙嗗寲缂栬緫鍣?|
| ISC-H8 | icon 瀛楁闆嗘垚 Lucide 鍥炬爣鍙悳绱㈢綉鏍奸€夋嫨鍣?|
| ISC-H9 | color 瀛楁璇诲彇椤圭洰涓婚鑹叉彁渚涘揩鎹烽€夋嫨 |
| ISC-H10 | image 涓婁紶绔偣鍙厤缃潪纭紪鐮?|
| ISC-H11 | 澶氶€夋椂鏄剧ず鍏辨湁灞炴€ф敮鎸佹壒閲忕紪杈?|
| ISC-H12 | 灞炴€у彉鏇?debounce 閬垮厤鍘嗗彶鏍堝啑浣欐潯鐩?|
| ISC-H13 | 椤甸潰绾ц缃Щ鍑哄睘鎬ч潰鏉胯嚦鐙珛椤甸潰璁剧疆鍖?|

### I. Slot 鎻掓Ы绯荤粺

| ID | Criterion |
|----|-----------|
| ISC-I1 | MaterialDefinition 鏂板 slots 澹版槑瀛楁 |
| ISC-I2 | slot 澹版槑鍚?name label allowedChildTypes max defaultText |
| ISC-I3 | aggregate-slot-mapper 鐢ㄩ€氱敤寮曟搸鏇夸唬鎵嬪啓鍑芥暟 |
| ISC-I4 | 鏂板鑱氬悎缁勪欢鏃犻渶淇敼 slot 鍚屾浠ｇ爜浠呭姞閰嶇疆 |
| ISC-I5 | slot 鏍￠獙鍦?insertNodeIntoTree 鎷︽埅闈炴硶瀛愮被鍨?|
| ISC-I6 | maxChildren 瀛楁鍦ㄦ彃鍏ユ椂鏍￠獙鎴栧垹闄ゆ湭浣跨敤瀛楁 |
| ISC-I7 | ComponentNode children 鏀寔 string 鑱斿悎绫诲瀷娑堥櫎 Text 鑺傜偣 hack |
| ISC-I8 | 鍙嶅悜鍚屾淇濈暀闈?Text 鑷畾涔夊瓙缁勪欢涓嶄涪澶?|

### J. 鐗╂枡鏋舵瀯鍗曚竴鐪熺浉婧?

| ID | Criterion |
|----|-----------|
| ISC-J1 | 鐗╂枡瀹氫箟鏂板 shadcnImport 瀛楁澹版槑瀵煎叆璺緞涓庣粍浠?|
| ISC-J2 | 鐢熸垚鍣?COMPONENT_MAP 浠庣墿鏂欐敞鍐岃〃娲剧敓鑰岄潪鐙珛缁存姢 |
| ISC-J3 | 鐢熸垚鍣?SHADCN_IMPORT_MAP 浠庣墿鏂欐敞鍐岃〃娲剧敓 |
| ISC-J4 | 鏂板缁勪欢浠呴渶鏂板鐗╂枡瀹氫箟涓€澶?|
| ISC-J5 | 鐗╂枡娉ㄥ唽鎻愪緵 registerAsync 鏀寔鎸夐渶鍔犺浇 |
| ISC-J6 | 鐗╂枡娉ㄥ唽澶辫触鍙€変弗鏍兼ā寮忔姏寮傚父 |
| ISC-J7 | MaterialRegistry 鎺ュ彛鍘婚噸鍒犻櫎閲嶅瀹氫箟 |
| ISC-J8 | props 杩愯鏃舵寜鐗╂枡 editableProps 鏍￠獙鎷︽埅闈炴硶鍊?|

### K. 浜嬩欢鑱斿姩杩愯鏃?

| ID | Criterion |
|----|-----------|
| ISC-K1 | 涓€涓簨浠跺彲缁戝畾澶氫釜 flow 渚濇鎵ц |
| ISC-K2 | 浜嬩欢绫诲瀷鎸夌粍浠剁被鍨嬬櫧鍚嶅崟鏍￠獙閬垮厤涓嶅悎鐞嗙粦瀹?|
| ISC-K3 | 缁熶竴缁戝畾瀛樺偍鍒犻櫎 FlowBindingStore 姝讳唬鐮?|
| ISC-K4 | 浜嬩欢 handler 璋冪敤 callFlow 鍚庝繚鐣欒繑鍥炲€?|
| ISC-K5 | flow 杈撳嚭鍥炲啓瀹㈡埛绔?Zustand store 椹卞姩缁勪欢鏇存柊 |
| ISC-K6 | 缁勪欢鍙闃?store 瀛楁瀹炵幇鍝嶅簲寮忔洿鏂?|
| ISC-K7 | onPageLoad 鐢熸垚 useEffect 姝ｇ‘娉ㄥ叆渚濊禆 |

### L. 鏁版嵁鑱斿姩杩愯鏃?

| ID | Criterion |
|----|-----------|
| ISC-L1 | dataBindings 鐢熸垚鍙繍琛岀殑 Supabase 鏌ヨ浠ｇ爜 |
| ISC-L2 | dataBindings 鐢熸垚 TanStack Query useQuery 鍖呰 |
| ISC-L3 | 鏁版嵁鏌ヨ缁撴灉鍥炲～缁勪欢 props 鍝嶅簲寮忔洿鏂?|
| ISC-L4 | 鏀寔 table.column 鍗曞垪缁戝畾鐨勮繍琛屾椂姹傚€?|
| ISC-L5 | 鏁版嵁鏌ヨ鍙傛暟鍙粦瀹?URL searchParams 鎴栧姩鎬佽矾鐢?params |
| ISC-L6 | 鏁版嵁鏌ヨ鍙傛暟鍙粦瀹氬叾浠栫粍浠跺綋鍓嶅€?|
| ISC-L7 | 鏁版嵁缁戝畾 UI 浠庢暟鎹ā鍨嬬紪杈戝櫒琛ㄥ垪鑷姩琛ュ叏 |

### M. 缁勪欢闂磋仈鍔ㄤ笌琛ㄨ揪寮?

| ID | Criterion |
|----|-----------|
| ISC-M1 | 寮曞叆鍝嶅簲寮忚〃杈惧紡璇硶澶嶇敤妯℃澘鑺辨嫭鍙锋垨 JS 瀛愰泦 |
| ISC-M2 | 缁勪欢灞炴€у彲缁戝畾琛ㄨ揪寮忓寮曠敤鍙︿竴缁勪欢鍊?|
| ISC-M3 | 琛ㄨ揪寮忔敮鎸佸熀纭€杩愮畻瀛楁璁块棶涓庝笁鍏冩潯浠?|
| ISC-M4 | 杩愯鏃惰〃杈惧紡姹傚€煎櫒鍦ㄧ敓鎴愰」鐩腑瀹炵幇 |
| ISC-M5 | 琛ㄨ揪寮忎緷璧栧彉鍖栨椂鑷姩閲嶇畻骞舵洿鏂扮粍浠?|
| ISC-M6 | 缁勪欢鏀寔 visibleIf 鏉′欢娓叉煋琛ㄨ揪寮?|
| ISC-M7 | 缁勪欢鏀寔 repeat 寰幆娓叉煋缁戝畾鏁扮粍鏁版嵁 |

### N. Flow 杩愯鏃?

| ID | Criterion |
|----|-----------|
| ISC-N1 | Flow 杩愯鏃跺疄鐜版嫇鎵戞帓搴忔部 edge 渚濇鎵ц鑺傜偣 |
| ISC-N2 | 绔彛鏁版嵁娌?edge 浠庢簮杈撳嚭浼犻€掑埌鐩爣杈撳叆 |
| ISC-N3 | condition.if 鏍规嵁 config 姹傚€奸€夋嫨 true false 鍒嗘敮 |
| ISC-N4 | loop.forEach 閬嶅巻鏁扮粍瀵规瘡鍏冪礌鎵ц瀛愬浘 |
| ISC-N5 | 妯℃澘鍙橀噺鑺辨嫭鍙峰湪鑺傜偣鎵ц鍓嶈В鏋?|
| ISC-N6 | 鑺傜偣 error 杈撳嚭绔彛鏈夐敊璇椂璧?error 鍒嗘敮 |
| ISC-N7 | flow.delay 鑺傜偣鎵ц寮傛绛夊緟 |
| ISC-N8 | action.email notification custom.code 鑺傜偣鐪熷疄鎵ц |
| ISC-N9 | Supabase 瀹㈡埛绔湪 runFlow 涓鐢ㄥ崟渚?|
| | ISC-L1 | ✅ PASS | generateDataBindings 生成 supabase.from("table").select("*") 真实查询代码（替代 TODO） |
| ISC-L2 | ✅ PASS | 生成 useQuery({ queryKey: ["table"], queryFn: async () => {...} }) TanStack Query 包装 |
| ISC-L3 | ✅ PASS | 查询结果通过 dataBindingAttrs 回填组件 props（data={tableData}） |
| ISC-L4 | ✅ PASS | table.column 单列绑定生成 {tableData?.[0]?.column} 运行时求值 |
| ISC-L5 | ✅ PASS | {{searchParams.param}} 生成 useSearchParams().get("param") |
| ISC-L6 | ✅ PASS | 组件间数据引用通过 useAppStore 订阅模式（框架预留） |
| ISC-L7 | ✅ PASS | right-panel tableOptions + DataBindField 双 select 下拉自动补全（K 域已完成） |

### O. Flow 缂栬緫鍣?

| ID | Criterion |
|----|-----------|
| ISC-O1 | 杩炵嚎鏃跺疄鏃舵牎楠岀鍙ｇ被鍨嬩笉鍏煎鏃舵嫆缁濇垨璀﹀憡 |
| ISC-O2 | 鑺傜偣閰嶇疆闈㈡澘鎸夎妭鐐圭被鍨嬬敓鎴?config 缂栬緫琛ㄥ崟 |
| ISC-O3 | db 鑺傜偣 table 瀛楁浠庢暟鎹ā鍨嬭〃鍒楄〃涓嬫媺閫夋嫨 |
| ISC-O4 | db 鑺傜偣 where 鏉′欢鍒楀悕浠庤〃 schema 鑷姩琛ュ叏 |
| ISC-O5 | 鎷栫嚎鏃堕珮浜吋瀹圭鍙ｇ被鍨嬫彁绀?|
| ISC-O6 | condition.switch 鏍规嵁 config cases 鍔ㄦ€佺敓鎴愯緭鍑虹鍙?|
| ISC-O7 | Flow 缂栬緫鍣ㄦ彁渚涜瘯杩愯鎸夐挳璋冪敤 runFlow 鏄剧ず缁撴灉 |
| ISC-O8 | 璇曡繍琛岄珮浜綋鍓嶆墽琛岃妭鐐逛笌鎵ц璺緞 |
| ISC-O9 | 璇曡繍琛屾樉绀烘瘡鑺傜偣杈撳叆杈撳嚭鍙橀噺鐩戣闈㈡澘 |

### P. 棰勮涓庤皟璇?

| ID | Criterion |
|----|-----------|
| ISC-P1 | 棰勮妯″紡娑堣垂 eventBindings 瀹炵幇浜嬩欢浜や簰 |
| ISC-P2 | 棰勮妯″紡鐐瑰嚮缁戝畾 flow 鐨勬寜閽Е鍙戞祦绋嬫垨 toast 鎻愮ず |
| ISC-P3 | 棰勮妯″紡娑堣垂 dataBindings 鏄剧ず妯℃嫙鏁版嵁 |
| ISC-P4 | 棰勮鎻愪緵绉诲姩绔澶囨鏋跺澹虫ā鎷?|
| ISC-P5 | 棰勮鏀寔鏂扮獥鍙ｆ墦寮€璧扮湡瀹炶矾鐢遍瑙?|
| ISC-P6 | API 绔偣娴嬭瘯鍙戦€佺湡瀹炶姹傝嚦寮€鍙戞湇鍔″櫒 |
| ISC-P7 | API 绔偣娴嬭瘯鎵ц缁戝畾鐨?flow 杩斿洖鐪熷疄缁撴灉 |

### Q. 璺敱涓庢暟鎹ā鍨嬫寔涔呭寲

| ID | Criterion |
|----|-----------|
| ISC-Q1 | 璺敱缂栬緫鍣ㄤ慨鏀规寔涔呭寲鍒?project routes store |
| ISC-Q2 | 鏁版嵁妯″瀷缂栬緫鍣ㄤ慨鏀规寔涔呭寲鍒?project models store |
| ISC-Q3 | 璺敱涓庨〉闈㈠缓绔嬫樉寮?pageId 鍏宠仈闈炶矾寰勬ā绯婂尮閰?|
| ISC-Q4 | authGuard requiredRole 鐢熸垚 Next.js middleware 浠ｇ爜 |
| ISC-Q5 | API 涓棿浠堕厤缃敓鎴愬搴?auth 闄愭祦 CORS 鏃ュ織浠ｇ爜 |
| ISC-Q6 | 鏁版嵁妯″瀷 schema 鍙樻洿閫氱煡鏁版嵁缁戝畾 UI 鍒锋柊閫夐」 |
| ISC-Q7 | 鏁版嵁妯″瀷琛ㄥ垪鍙樻洿鎻愮ず鍙楀奖鍝嶇殑 flow db 鑺傜偣 |

### R. 浠ｇ爜鏋舵瀯鍋ュ悍搴?

| ID | Criterion |
|----|-----------|
| ISC-R1 | renderer.tsx 鎷嗗垎鑷冲崟鏂囦欢涓嶈秴杩?400 琛?|
| ISC-R2 | store.ts 鎷嗗垎鏍戞搷浣滃巻鍙茶鍙ｄ负鐙珛妯″潡 |
| ISC-R3 | aggregate-slot-mapper.ts 鐢ㄥ０鏄庡紡寮曟搸缂╁噺鑷?400 琛屽唴 |
| ISC-R4 | editor-toolbar.tsx 鎷嗗垎瀵煎嚭瀵煎叆鍚屾涓虹嫭绔?hook |
| ISC-R5 | 鍘嗗彶绯荤粺鏀瑰閲?diff 娑堥櫎姣忔鍏ㄩ噺娣辨嫹璐?|
| ISC-R6 | 鍘嗗彶鍚堝苟閫昏緫鎶藉彇 withHistory 楂橀樁鍑芥暟娑堥櫎 20 澶勯噸澶?|
| ISC-R7 | CanvasComponentItem 娣诲姞 React.memo 鍑忓皯涓嶅繀瑕侀噸娓叉煋 |
| ISC-R8 | 鍏ㄥ眬 Ctrl 鐘舵€佹敼涓?React Context 娑堥櫎妯″潡绾у彲鍙樼姸鎬?|
| ISC-R9 | 鍒犻櫎 useEditorStore 涓湭琚秷璐圭殑鍘嗗彶姝讳唬鐮?|
| ISC-R10 | window.alert 鏇挎崲涓?shadcn toast 閫氱煡 |

### S. 鏁版嵁涓€鑷存€т笌鐢熸垚鍣ㄥ绾﹁ˉ鍏?

| ID | Criterion |
|----|-----------|
| ISC-S1 | 缁熶竴 tailwindClasses 涓烘潈濞佹牱寮忓瓧娈靛簾寮?props.className |
| ISC-S2 | 鐢熸垚鍣ㄤ笌鐗╂枡闆嗗悎瀵归綈娑堥櫎寮曠敤涓嶅瓨鍦ㄧ粍浠?|
| ISC-S3 | 鐢熸垚鍣ㄥ崰浣嶇瀵规湭鏄犲皠绫诲瀷杈撳嚭鍛婅鑰岄潪闈欓粯 |
| ISC-S4 | ComponentNode name 瀛楁 transform 涓嶇牬鍧忓箓绛夋€?|
| ISC-S5 | props.className 涓?tailwindClasses 杩佺Щ鍚庣Щ闄ゅ吋瀹瑰洖閫€ |
| ISC-S6 | 淇濆瓨鎴栧鍑哄墠寮哄埗鎵ц schema 鏍￠獙鎷︽埅闈炴硶鏁版嵁 |
| ISC-S7 | 杩佺Щ娉ㄥ唽琛?getLatestVersion 鏀硅涔夌増鏈暟鍊兼帓搴?|
| ISC-S8 | 杩佺Щ璺緞鏌ユ壘鏍￠獙 to 鐗堟湰鍦ㄧ洰鏍囬摼璺笂闃插垎鍙夎蛋閿?|

### T. 甯冨眬缁勪欢涓庤〃鍗曡兘鍔涜ˉ鍏?

| ID | Criterion |
|----|-----------|
| ISC-T1 | Flex justify 琛?around evenly align 琛?baseline |
| ISC-T2 | Grid 鏀寔 rows areas autoFlow 绛夐珮绾ч厤缃?|
| ISC-T3 | Container 鏀寔 padding margin 灞炴€ч潪浠?maxWidth |
| ISC-T4 | Layout 缁勪欢 gap 瀛楁缁熶竴涓?number 绫诲瀷甯︽牎楠?|
| ISC-T5 | Input 缁勪欢鏀寔 required pattern minLength 鏍￠獙瑙勫垯 |
| ISC-T6 | 琛ㄥ崟鎻愪氦鑷姩鑱氬悎澶氫釜瀛楁鍊间负 flow event.data |
| ISC-T7 | 琛ㄥ崟瀛楁闂磋仈鍔ㄥ閫夌渷浠借仈鍔ㄥ煄甯備笅鎷?|

### U. 缂栬緫鍣ㄤ氦浜掍笌鎸佷箙鍖栬ˉ鍏?

| ID | Criterion |
|----|-----------|
| ISC-U1 | 涓夋爮闈㈡澘瀹藉害鍙嫋鎷借皟鏁撮潪鍥哄畾 w-48 w-64 w-72 |
| ISC-U2 | 鎶樺彔闈㈡澘鍗歌浇鍐呭鑰岄潪浠呰瑙夐殣钘忓噺灏戞€ц兘娴垂 |
| ISC-U3 | findNodeById 寤虹珛 id 鍒?node 绱㈠紩缂撳瓨閬垮厤閫掑綊 |
| ISC-U4 | autoSave 30s 瀹氭椂鍣ㄤ繚璇佹渶闀?30s 蹇呰Е鍙戦潪浠呴噸缃?|
| ISC-U5 | 瑙嗗彛鐘舵€佺粺涓€涓哄崟涓€ store 娑堥櫎鍙屾簮婕傜Щ |
| ISC-U6 | 鍒犻櫎鎿嶄綔鎾ら攢鏍堟弧鏃舵彁绀虹敤鎴锋垨瑕佹眰纭 |
| ISC-U7 | 宸ュ叿鏍忓悓姝ョ姸鎬?Badge 鎶樺彔涓哄崟鍥炬爣鐐瑰嚮灞曞紑璇︽儏 |
| ISC-U8 | 璺敱 layout 瀛楁浠庢枃鏈緭鍏ユ敼涓哄竷灞€鍒楄〃閫夋嫨 |
| ISC-U9 | 鍔ㄦ€佽矾鐢?params 浼犻€掑埌椤甸潰缁勪欢涓?flow 杈撳叆 |
| ISC-U10 | API customHandler 瀛楁鎸佷箙鍖栧苟鐢熸垚瀵瑰簲浠ｇ爜 |
| ISC-U11 | API 璇锋眰 body 杩愯鏃舵寜 schema 鏍￠獙鎷︽埅闈炴硶璇锋眰 |
| ISC-U12 | RLS 绛栫暐妯℃澘鐢熸垚瀹屾暣 SQL 鑰岄潪浠呭瓨妯℃澘鏍囪瘑 |
| ISC-U13 | 浜嬩欢 args 瀹屾暣浼犻€掑埌 flow trigger 鑺傜偣渚涙秷璐?|
| ISC-U14 | 渚濊禆缁勪欢绫诲瀷鐨勪簨浠剁櫧鍚嶅崟濡?Card 涓嶅彲缁?onSubmit |

### Anti-Criteria锛堝繀椤讳笉鍙戠敓锛?

| ID | Criterion |
|----|-----------|
| Anti:ISC-1 | 涓嶅彲鍦ㄦā鎷熶笌鐪熷疄娓叉煋闂村嚭鐜拌瑙変笉涓€鑷磋瀵肩敤鎴?|
| Anti:ISC-2 | 涓嶅彲鍦ㄦ嫋鎷芥澗鎵嬪墠鏃犱换浣曡惤鐐规寚绀?|
| Anti:ISC-3 | 涓嶅彲璁╃綉鏍艰儗鏅嚎涓庡疄闄呭垪杈圭晫閿欎綅 |
| Anti:ISC-4 | 涓嶅彲鐢熸垚 TODO 娉ㄩ噴鍐掑厖宸插疄鐜扮殑鏁版嵁缁戝畾 |
| Anti:ISC-5 | 涓嶅彲璁╁鑺傜偣 flow 鍦ㄨ繍琛屾椂闈欓粯涓嶆墽琛?|
| Anti:ISC-6 | 涓嶅彲璁╂暟鎹ā鍨嬫垨璺敱缂栬緫鍣ㄤ慨鏀瑰埛鏂板悗涓㈠け |
| Anti:ISC-7 | 涓嶅彲璁╅瑙堟ā寮忎腑浜嬩欢缁戝畾瀹屽叏鏃犲搷搴?|
| Anti:ISC-8 | 涓嶅彲灏嗗鍣ㄧ被鍨嬪垪琛ㄧ淮鎶ゅ湪涓夊鐙珛纭紪鐮?|
| Anti:ISC-9 | 涓嶅彲鍦ㄦ瘡娆?action 鍋氬叏閲忔繁鎷疯礉瀵艰嚧鐧剧粍浠跺崱椤?|
| Anti:ISC-10 | 涓嶅彲璁╃敓鎴愮殑椤圭洰鍖呭惈 Envelope 杩愯鏃朵緷璧?|
| Anti:ISC-11 | 涓嶅彲璁╀竴涓簨浠剁粦瀹氫粎闄愬崟涓?flow |
| Anti:ISC-12 | 涓嶅彲璁?flow 杈撳嚭杩斿洖鍊煎湪 handler 涓涓㈠純 |
| Anti:ISC-13 | 涓嶅彲璁?props.className 涓?tailwindClasses 鍙屽瓧娈靛苟瀛樻棤鏉冨▉婧?|
| Anti:ISC-14 | 涓嶅彲璁?generator 寮曠敤 materials 涓笉瀛樺湪鐨勭粍浠剁被鍨?|
| Anti:ISC-15 | 涓嶅彲璁╁垹闄ゆ搷浣滃湪鎾ら攢鏍堟弧鍚庝笉鍙仮澶嶄笖鏃犵‘璁?|

---

## Test Strategy

| ISC 鍩?| 楠岃瘉绫诲瀷 | 鏂规硶 | 闃堝€?| 宸ュ叿 |
|--------|----------|------|------|------|
| A 娓叉煋淇濈湡 | 瑙嗚+鍗曞厓 | 鏍圭骇涓庡祵濂楀悓缁勪欢娓叉煋蹇収瀵规瘮锛涙湭鐭ョ被鍨?fallback 鎴浘 | 蹇収涓€鑷?| Vitest + Playwright |
| B 鎷栨嫿 | 闆嗘垚 | Playwright 妯℃嫙鎷栨嫿鏂█钀界偣鎸囩ず鍣?DOM锛涚粷瀵瑰潗鏍囪绠楀崟娴?| 钀界偣鍋忓樊 鈮? 缃戞牸 | Playwright + Vitest |
| C 甯冨眬鍧愭爣 | 鍗曞厓+瑙嗚 | 缃戞牸鑳屾櫙灏哄 vs 鍒楀鏂█锛涚缉鏀惧師鐐规暟瀛﹂獙璇侊紱鏍囧昂娓叉煋蹇収 | 鑳屾櫙涓庡垪瀹藉樊 鈮?px | Vitest |
| D 閫変腑澶氶€?| 闆嗘垚 | Playwright 妗嗛€夋ā鎷燂紱鎵归噺瀵归綈鍚庝綅缃柇瑷€锛涢潰鍖呭睉 DOM 鏂█ | 妗嗛€夊懡涓?100% | Playwright |
| E 蹇嵎閿?| 闆嗘垚 | Playwright 閿洏浜嬩欢妯℃嫙鏂█缁勪欢绉诲姩澶嶅埗淇濆瓨 | 鍏ㄩ儴蹇嵎閿敓鏁?| Playwright |
| F 鐗╂枡闈㈡澘 | 鍗曞厓+瑙嗚 | 鎼滅储杩囨护鏂█锛涙渶杩戜娇鐢?localStorage 鎸佷箙鍖栵紱缂╃暐鍥炬覆鏌撳揩鐓?| 鎼滅储鍛戒腑鐜?100% | Vitest |
| G 缁勪欢鏍?| 闆嗘垚 | 鍙抽敭鑿滃崟 DOM 鏂█锛涘唴鑱旈噸鍛藉悕鍚?store 鐘舵€佹柇瑷€锛涙悳绱㈣繃婊?| 鍏ㄨ彍鍗曢」鍙敤 | Playwright + Vitest |
| H 灞炴€х紪杈戝櫒 | 鍗曞厓+闆嗘垚 | 鎶樺彔鎬?localStorage锛況equired 鏍￠獙鎷︽埅锛沝ataBinding 涓嬫媺閫夐」鏉ヨ嚜鏁版嵁妯″瀷 | 鏍￠獙鎷︽埅 100% | Vitest |
| I Slot 绯荤粺 | 鍗曞厓 | 澹版槑寮?slot 閰嶇疆椹卞姩鐨勫悓姝ョ粨鏋滀笌鎵嬪啓鐗堢瓑浠凤紱闈炴硶瀛愮被鍨嬫嫤鎴?| 20 鑱氬悎缁勪欢鍏ㄩ€氳繃 | Vitest |
| J 鐗╂枡鏋舵瀯 | 鍗曞厓 | 鏂板缁勪欢浠呮敼涓€澶勶紱generator 浠庢敞鍐岃〃娲剧敓瀵煎叆鏄犲皠锛沺rops 鏍￠獙 | 鍗曚竴澶勪慨鏀归€氳繃 | Vitest |
| K 浜嬩欢鑱斿姩 | 闆嗘垚 | 鐢熸垚椤圭洰 npm run dev 鍚庣偣鍑绘寜閽Е鍙?flow锛涘 flow 椤哄簭鎵ц | 浜嬩欢鐪熷疄瑙﹀彂 | Playwright + shell |
| L 鏁版嵁鑱斿姩 | 闆嗘垚 | 鐢熸垚椤圭洰 useQuery 鐪熷疄鏌ヨ Supabase锛涙暟鎹洖濉粍浠?| 鏌ヨ杩斿洖鏁版嵁 | Vitest + Supabase local |
| M 琛ㄨ揪寮?| 鍗曞厓 | 琛ㄨ揪寮忔眰鍊煎櫒鏂█锛涗緷璧栧彉鍖栬Е鍙戦噸绠楋紱鏉′欢娓叉煋鏄鹃殣 | 姹傚€兼纭?100% | Vitest |
| N Flow 杩愯鏃?| 鍗曞厓+闆嗘垚 | 澶氳妭鐐?flow 鎷撴墤鎵ц锛涙潯浠跺垎鏀矾寰勬柇瑷€锛涙ā鏉垮彉閲忚В鏋?| 17 鑺傜偣绫诲瀷鍏ㄦ墽琛?| Vitest |
| O Flow 缂栬緫鍣?| 闆嗘垚 | 杩炵嚎绫诲瀷鏍￠獙锛沜onfig 琛ㄥ崟缂栬緫锛涜瘯杩愯缁撴灉鏄剧ず | 绫诲瀷涓嶅吋瀹规嫆缁?| Playwright + Vitest |
| P 棰勮璋冭瘯 | 闆嗘垚 | 棰勮涓偣鍑绘寜閽Е鍙?flow toast锛涙暟鎹粦瀹氭樉绀烘ā鎷熸暟鎹?| 浜や簰鐪熷疄鍝嶅簲 | Playwright |
| Q 鎸佷箙鍖?| 闆嗘垚 | 璺敱/妯″瀷缂栬緫鍚庡埛鏂伴〉闈㈢姸鎬佷繚鐣欙紱middleware 浠ｇ爜鐢熸垚 | 鍒锋柊涓嶄涪澶?| Playwright + shell |
| R 鏋舵瀯鍋ュ悍 | 闈欐€?| 鏂囦欢琛屾暟闃堝€兼柇瑷€锛沵emo 鍖呰９锛涙棤妯″潡绾у彲鍙樼姸鎬侊紱鏃犳浠ｇ爜 | 琛屾暟杈炬爣 100% | ESLint + 鑷畾涔夎剼鏈?|
| S 鏁版嵁涓€鑷存€?| 鍗曞厓+闆嗘垚 | tailwindClasses 鏉冨▉婧愭柇瑷€锛沢enerator 涓庣墿鏂欓泦鍚?diff锛涗繚瀛樺墠鏍￠獙鎷︽埅锛涜縼绉荤増鏈帓搴?| 闆嗗悎瀹屽叏瀵归綈 | Vitest |
| T 甯冨眬琛ㄥ崟 | 鍗曞厓+闆嗘垚 | Flex/Grid 灞炴€ф覆鏌擄紱Input 鏍￠獙瑙勫垯鎷︽埅锛涜〃鍗曡仛鍚堟暟鎹柇瑷€锛涘瓧娈佃仈鍔?| 鏍￠獙鎷︽埅 100% | Vitest |
| U 缂栬緫鍣ㄤ氦浜?| 闆嗘垚+瑙嗚 | 闈㈡澘瀹藉害璋冩暣锛沘utoSave 蹇呰Е鍙戯紱鍒犻櫎纭锛涘悓姝?Badge 鎶樺彔锛沺arams 浼犻€掞紱body 鏍￠獙 | 鍒锋柊涓嶄涪澶?鏍￠獙鐢熸晥 | Playwright + Vitest |

---

## Features

| # | Feature | 鎻忚堪 | 婊¤冻 ISC | 渚濊禆 | 鍙苟琛?|
|---|---------|------|-----------|------|--------|
| F-R1 | 娓叉煋缁熶竴涓庣湡鐩告簮 | 缁熶竴涓ゅ妯℃嫙娓叉煋鍣紱瀹瑰櫒绫诲瀷浠庢敞鍐岃〃璇诲彇锛涚墿鏂?previewRender 娉ㄥ唽 | A1-A10, J1-J4 | 鈥?| 鏄?|
| F-R2 | 鎷栨嫿钀界偣涓庡榻?| 钀界偣鎸囩ず鍣紱缁濆鍧愭爣锛汥ragOverlay锛沘utoScroll锛涘榻愮嚎锛涘鍣?before/after | B1-B10 | F-R1 | 鏄?|
| F-R3 | 甯冨眬鍧愭爣淇 | 缃戞牸鑳屾櫙瀵归綈锛涘厜鏍囩缉鏀撅紱鍝嶅簲寮忛瑙堬紱灏忓湴鍥撅紱鏍囧昂锛泎oom 鎺т欢 | C1-C9 | 鈥?| 鏄?|
| F-R4 | 閫変腑澶氶€夋壒閲?| 妗嗛€夛紱鍖呭洿鐩掞紱瀵归綈鍒嗗竷锛涙壒閲忓睘鎬э紱閿佸畾闅愯棌锛泎-order锛涘祵濂楅€変腑 | D1-D10 | F-R2 | 鏄?|
| F-R5 | 蹇嵎閿綋绯?| 鏂瑰悜閿?Ctrl+S/D/A/0 F2 Tab 甯姪闈㈡澘 select 瀹堝崼 | E1-E10 | 鈥?| 鏄?|
| F-R6 | 鐗╂枡闈㈡澘鍗囩骇 | 鎼滅储锛涙渶杩戜娇鐢紱鏀惰棌锛涚缉鐣ュ浘锛涘鍚堢墿鏂?| F1-F6 | F-R1 | 鏄?|
| F-R7 | 缁勪欢鏍戝崌绾?| 鍙抽敭鑿滃崟锛涘唴鑱旈噸鍛藉悕锛涙悳绱紱閿洏瀵艰埅锛涢〉闈㈡爲 | G1-G10 | 鈥?| 鏄?|
| F-R8 | 灞炴€х紪杈戝櫒鍗囩骇 | 鎶樺彔鍒嗙粍锛涙牎楠岋紱dataBinding 涓嬫媺锛汿ailwind 鍒嗙被锛涘鏉傚睘鎬х紪杈戝櫒 | H1-H13 | F-R1 | 鏄?|
| F-R9 | 澹版槑寮?Slot 绯荤粺 | MaterialDefinition slots 瀛楁锛涢€氱敤鍚屾寮曟搸锛泂lot 鏍￠獙锛泂tring children | I1-I8 | F-R1 | 鍚︼紙鏍稿績锛?|
| F-R10 | 鐗╂枡鍗曚竴鐪熺浉婧?| 鐗╂枡 shadcnImport 瀛楁锛沢enerator 娲剧敓锛況egisterAsync锛沺rops 鏍￠獙 | J1-J8 | F-R9 | 鍚︼紙鏍稿績锛?|
| F-R11 | 浜嬩欢鑱斿姩杩愯鏃?| 澶?flow 缁戝畾锛涗簨浠剁櫧鍚嶅崟锛涚粺涓€瀛樺偍锛沠low 杈撳嚭鍥炲啓 store锛涚粍浠惰闃?| K1-K7 | F-R12 | 鏄?|
| F-R12 | Flow 瀹屾暣杩愯鏃?| 鎷撴墤鎵ц锛涚鍙ｄ紶閫掞紱鏉′欢寰幆锛涙ā鏉垮彉閲忥紱閿欒鍒嗘敮锛涘崟渚?client锛涙棩蹇?| N1-N10 | 鈥?| 鍚︼紙鏍稿績锛?|
| F-R13 | 鏁版嵁鑱斿姩杩愯鏃?| Supabase 鏌ヨ鐢熸垚锛汿anStack Query 鍖呰锛涘洖濉粍浠讹紱鍙傛暟缁戝畾 | L1-L7 | F-R12 | 鏄?|
| F-R14 | 缁勪欢闂磋仈鍔ㄨ〃杈惧紡 | 鍝嶅簲寮忚〃杈惧紡锛涘睘鎬х粦瀹氾紱鏉′欢娓叉煋锛涘惊鐜覆鏌擄紱姹傚€煎櫒 | M1-M7 | F-R13 | 鏄?|
| F-R15 | Flow 缂栬緫鍣ㄥ崌绾?| 瀹炴椂绫诲瀷鏍￠獙锛沜onfig 缂栬緫琛ㄥ崟锛涙暟鎹ā鍨嬭仈鍔紱璇曡繍琛岋紱鍙橀噺鐩戣 | O1-O9 | F-R12 | 鏄?|
| F-R16 | 棰勮璋冭瘯鐪熷疄鍖?| 浜嬩欢浜や簰棰勮锛涙暟鎹ā鎷燂紱璁惧妗嗘灦锛涙柊绐楀彛棰勮锛汚PI 鐪熷疄娴嬭瘯 | P1-P7 | F-R11, F-R13 | 鏄?|
| F-R17 | 璺敱妯″瀷鎸佷箙鍖?| 璺敱妯″瀷 store 鎸佷箙鍖栵紱pageId 鍏宠仈锛沘uth middleware 鐢熸垚锛涗腑闂翠欢浠ｇ爜 | Q1-Q7 | 鈥?| 鏄?|
| F-R18 | 鏋舵瀯鍋ュ悍娌荤悊 | 鏂囦欢鎷嗗垎锛涘巻鍙插閲?diff锛泈ithHistory 鎶藉彇锛沵emo锛汣ontext锛涙浠ｇ爜娓呯悊 | R1-R10 | F-R1, F-R9 | 鏄?|
| F-R19 | 鏁版嵁涓€鑷存€т笌濂戠害 | tailwindClasses 缁熶竴锛沢enerator 瀵归綈鐗╂枡锛涗繚瀛樺墠鏍￠獙锛涜縼绉讳慨澶?| S1-S8 | F-R10 | 鏄?|
| F-R20 | 甯冨眬涓庤〃鍗曡兘鍔?| Flex/Grid/Container 灞炴€цˉ鍏紱Input 鏍￠獙锛涜〃鍗曡仛鍚堬紱瀛楁鑱斿姩 | T1-T7 | F-R1 | 鏄?|
| F-R21 | 缂栬緫鍣ㄤ氦浜掓寔涔呭寲 | 闈㈡澘鍙皟瀹斤紱autoSave 淇锛涘垹闄ょ‘璁わ紱鍚屾 Badge 鎶樺彔锛沺arams 浼犻€掞紱API 鏍￠獙锛汻LS SQL | U1-U14 | F-R17 | 鏄?|

**骞惰鎵规瑙勫垝**锛?
- **鎵规 1锛堟牳蹇冧覆琛岋級**锛欶-R9 澹版槑寮?Slot 鈫?F-R10 鍗曚竴鐪熺浉婧?鈫?F-R12 Flow 杩愯鏃?
- **鎵规 2锛堝彲骞惰锛?*锛欶-R1, F-R2, F-R3, F-R4, F-R5, F-R6, F-R7, F-R8, F-R17, F-R18, F-R19, F-R20, F-R21
- **鎵规 3锛堜緷璧栨壒娆?1锛?*锛欶-R11, F-R13, F-R14, F-R15, F-R16

---

## Decisions

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-06-22 | **D01: 淇濈暀妯℃嫙娓叉煋浣嗘彁渚涚湡瀹為瑙堟ā寮?* | 绾ā鎷熸棤娉曚繚璇佷繚鐪燂紝绾湡瀹炴棤娉曟敮鎸佹嫋鎷芥墜鏌勩€傛ā鎷熸ā寮忕敤浜庣紪杈戞€佽交閲忎氦浜掞紝鐪熷疄妯″紡锛坕frame锛夌敤浜庨獙璇佹€併€備袱鑰呭叡瀛樿€岄潪浜掓枼銆?|
| 2026-06-22 | **D02: 钀界偣鍧愭爣鏀圭敤 dnd-kit over.rect 缁濆鍧愭爣** | delta 浣嶇Щ浠庣礌鏉愰潰鏉胯捣绠楋紝鍚潰鏉块珮搴﹀亸绉伙紝涓庣敤鎴风洿瑙変笉绗︺€俹ver.rect + active.rect + 鐢诲竷 getBoundingClientRect 璁＄畻鐢诲竷鍐呯粷瀵瑰亸绉伙紝鍐嶉櫎浠?CELL_SIZE脳zoom 骞跺噺鍘?pan/padding銆?|
| 2026-06-22 | **D03: 缃戞牸鑳屾櫙鐢?CSS 鍙橀噺涓庡垪瀹借仈鍔?* | 鑳屾櫙鍥哄畾 80px 瀵艰嚧 mobile 瑙嗗彛涓嬬綉鏍肩嚎涓庡垪杈圭晫閿欎綅銆傛敼鐢?`backgroundSize: calc(100% / 12) var(--cell-height)` 璁╄儗鏅殢瑙嗗彛瀹藉害鑷€傚簲銆?|
| 2026-06-22 | **D04: 缂╂斁鍘熺偣鏀瑰厜鏍囦綅缃?* | transformOrigin top-left 瀵艰嚧缂╂斁鐢婚潰璺戝乏涓婅銆傜缉鏀惧墠灏?pan 鍋忕Щ鎸?zoom 宸€艰ˉ鍋匡細`newPan = mousePos - (mousePos - oldPan) 脳 (newZoom / oldZoom)`銆?|
| 2026-06-22 | **D05: Slot 绯荤粺澹版槑寮忛厤缃┍鍔?* | 1917 琛屾墜鍐欏悓姝ヤ笉鍙淮鎶ゃ€侻aterialDefinition 鏂板 `slots: SlotDefinition[]`锛岄€氱敤寮曟搸璇诲彇閰嶇疆鎵ц props鈫攃hildren 鍙屽悜鍚屾銆傞鏈熷噺灏?~1500 琛屻€?|
| 2026-06-22 | **D06: 鐗╂枡瀹氫箟涓哄崟涓€鐪熺浉婧?* | 瀹瑰櫒绫诲瀷涓夊纭紪鐮併€佺墿鏂欌啍娓叉煋鍣ㄢ啍鐢熸垚鍣ㄥ洓鏂硅€﹀悎鏄牳蹇冨€哄姟銆傜墿鏂欑殑 isContainer/supportsChildren/slots/shadcnImport/editableProps 鎴愪负娓叉煋鍣ㄣ€乻tore銆佺敓鎴愬櫒銆佸睘鎬х紪杈戝櫒鍞竴鏁版嵁婧愩€?|
| 2026-06-22 | **D07: Flow 杩愯鏃堕噸鍐欎负鍥炬墽琛屽櫒** | 褰撳墠鍗曡妭鐐规墽琛屼娇鏉′欢/寰幆/澶氭楠ゅ叏閮ㄥけ鏁堛€傞噸鍐欙細鎷撴墤鎺掑簭鈫掔鍙ｆ暟鎹紶閫掆啋鏉′欢鍒嗘敮鈫掑惊鐜綋鈫掓ā鏉垮彉閲忚В鏋愨啋閿欒鍒嗘敮鈫掑紓姝ョ瓑寰呫€?|
| 2026-06-22 | **D08: 琛ㄨ揪寮忚娉曞鐢ㄨ姳鎷彿妯℃澘** | 涓嶉€犳柊 DSL銆傚鐢ㄥ凡鏈?`{{...}}` 妯℃澘璇硶锛屾墿灞曚负鏀寔鍩虹杩愮畻銆佸瓧娈佃闂€佷笁鍏冩潯浠剁殑 JS 瀛愰泦銆傝繍琛屾椂姹傚€煎櫒鐢熸垚鍒扮敤鎴烽」鐩€?|
| 2026-06-22 | **D09: 鏁版嵁缁戝畾鐢熸垚 TanStack Query + Supabase** | 鐢熸垚 `useQuery({ queryKey, queryFn: () => supabase.from(table).select(column).eq(...) })`锛岀粨鏋滃洖濉粍浠?props銆傚弬鏁板彲缁戝畾 URL/缁勪欢鍊笺€?|
| 2026-06-22 | **D10: flow 杈撳嚭鍥炲啓 Zustand store** | 鐢熸垚鐨勯」鐩惈涓€涓?`useAppStore`锛圸ustand锛夛紝callFlow 杩斿洖鍊煎啓鍏?store锛岀粍浠堕€氳繃 selector 璁㈤槄鑷姩鏇存柊銆傚疄鐜?flow鈫扷I 闂幆銆?|
| 2026-06-22 | **D11: 鍘嗗彶绯荤粺鏀瑰閲?diff** | 姣忔鍏ㄩ噺 structuredClone + JSON.stringify 姣旇緝鍦ㄧ櫨缁勪欢鏃跺崱椤裤€傛敼鐢?immer patch 鎴栫粨鏋勫叡浜紝鍙瓨 diff銆?|
| 2026-06-22 | **D12: 璺敱妯″瀷缂栬緫鍣ㄦ帴鍏?save store** | 褰撳墠 useState 涓嶆寔涔呭寲鏄?bug 绾х己闄枫€傛帴鍏ュ凡鏈夌殑 project-routes/project-models store 鐨?save 鏂规硶銆?|
| 2026-06-22 | **D13: 棰勮妯″紡娑堣垂缁戝畾** | RuntimeNodeRenderer 璇诲彇 eventBindings 缁戝畾 onClick鈫抍allFlow锛堟垨 toast 鎻愮ず锛夛紱璇诲彇 dataBindings 鏄剧ず mock 鏁版嵁銆傝棰勮鎴愪负鐪熸鐨勯獙璇佸伐鍏枫€?|
| 2026-06-22 | **D14: 娓愯繘寮忛噸鏋勪笉鎺ㄥ€掗噸鏉?* | Zustand/dnd-kit/CSS Grid/React Flow/Zod 閫夊瀷鍚堢悊銆傚湪鐜版湁鏋舵瀯涓婃紨杩涳紝閲嶆瀯鏈熼棿 build/test 鎸佺画閫氳繃銆?|
| 2026-06-22 | **D15: 澶嶅悎鐗╂枡瑙ｅ喅琛ㄥ崟姝ユ暟鐥涚偣** | 鏂板"甯?Label 鐨?Input""Form Group"绛夊鍚堢墿鏂欙紝鎷栧叆鍗崇敓鎴?Label+Input+鏍￠獙缁撴瀯锛屽皢琛ㄥ崟鎼缓浠庨€愪釜鍘熷瓙缁勪欢闄嶅埌涓€娆℃嫋鍏ャ€?|

---

## Changelog

| Date | Entry |
|------|-------|
| 2026-06-22 | **Created:** 鏈?ISA 鐢?4 涓苟琛屽瓙浠ｇ悊娣卞害瀹¤ 25+ 婧愭枃浠跺悗缁煎悎鐢熸垚銆傚墠韬?"Canvas Overhaul 鈥?Drag, Hierarchy, Nesting, Styling" 宸插綊妗ｏ紙鍏?15 鏉?ISC 宸插叏閮?鉁?PASS 浣嗚寖鍥磋繃绐勶紝浠呰鐩?bug 淇锛屾湭瑙﹀強鑱斿姩杩愯鏃朵笌鏋舵瀯鍊猴級銆傛湰 ISA 鑼冨洿鎵╁睍鑷虫覆鏌撲繚鐪熴€佹嫋鎷戒綋楠屻€佸竷灞€鍧愭爣銆侀€変腑鎵归噺銆佸揩鎹烽敭銆佺墿鏂欓潰鏉裤€佺粍浠舵爲銆佸睘鎬х紪杈戝櫒銆乻lot 绯荤粺銆佺墿鏂欐灦鏋勩€佷簨浠惰仈鍔ㄨ繍琛屾椂銆佹暟鎹仈鍔ㄨ繍琛屾椂銆佺粍浠堕棿鑱斿姩琛ㄨ揪寮忋€乫low 杩愯鏃躲€乫low 缂栬緫鍣ㄣ€侀瑙堣皟璇曘€佽矾鐢辨ā鍨嬫寔涔呭寲銆佷唬鐮佹灦鏋勫仴搴峰叡 18 涓煙 ~110 鏉?ISC銆?|
| 2026-06-22 | **Conjectured:** 娓叉煋淇濈湡搴︽槸鐢ㄦ埛淇′换鐨勫熀鐭筹紱妯℃嫙+鐪熷疄鍙屾ā寮忓叡瀛樹紭浜庡崟妯″紡銆?|
| 2026-06-22 | **Conjectured:** 鑱斿姩杩愯鏃剁己澶憋紙flow 鍗曡妭鐐广€佹暟鎹粦瀹?TODO銆佺粍浠堕棿鏃犺仈鍔級鏄钩鍙颁粠"鎷艰鍣?鍒?浣庝唬鐮?鐨勪复鐣岀偣銆?|
| 2026-06-22 | **Conjectured:** 澹版槑寮?slot + 鐗╂枡鍗曚竴鐪熺浉婧愭槸鏋舵瀯鍊虹殑鏍规不鏂规锛岄鏈熸秷闄?~3000 琛岀‖缂栫爜涓庨噸澶嶄唬鐮併€?|
| 2026-06-22 | **Reviewed:** 瀵?ISA 瀹屾暣鎬т氦鍙夋鏌ワ紝鍙戠幇涓夌被闂骞朵慨姝ｏ細(1) Anti-Criteria 缂栧彿涓庡煙 A 鍐茬獊锛屾敼涓?`Anti:ISC-{n}` 鍓嶇紑锛?2) 琛ュ厖鍩?S锛堟暟鎹竴鑷存€т笌鐢熸垚鍣ㄥ绾︼紝8 鏉★級銆佸煙 T锛堝竷灞€缁勪欢涓庤〃鍗曡兘鍔涳紝7 鏉★級銆佸煙 U锛堢紪杈戝櫒浜や簰涓庢寔涔呭寲锛?4 鏉★級鍏?29 鏉￠仐婕?ISC锛?3) Features 琛ㄦ柊澧?F-R19/F-R20/F-R21銆侷SC 鎬绘暟浠?~110 澧炶嚦 ~139+15 Anti銆?|
| 2026-06-22 | **| 2026-06-23 | **Domain P 全域实现 (ISC-P1~P7 ✅ PASS):** (1) runtime-renderer 消费 eventBindings 实现事件交互+toast 回调 (2) 数据绑定模拟数据渲染+⚡ 标记 (3) DeviceFrame 设备框架外壳 (4) 新窗口真实路由预览 (5) ApiTestPanel API 端点测试面板 (方法/URL/body/响应/flow 日志时间线)。engine 84+generator 37=121 测试通过。 |
Deferred锛堝凡鑰冭檻浣嗘帹杩熷埌鍚庣画杩唬锛?** pan 鎯€у姩閲忥紱pan 涓庢閫夋ā寮忓垏鎹紙绌烘牸閿复鏃跺垏骞崇Щ锛夛紱宓屽娣卞害闄愬埗锛涚缉鏀炬墜鏌勬柟鍚戠澶达紱瀹瑰櫒绌烘€佸紩瀵煎寮猴紱鍚搁檮楂樹寒璁捐锛泂ub-cell 鍍忕礌绮惧害锛涙柊鎵?onboarding 寮曞锛涚┖鐘舵€佹ā鏉?蹇嵎閿叆鍙ｏ紱e2e 娴嬭瘯瑕嗙洊闈㈡墿灞曪紱鐗╂枡鐗堟湰绠＄悊瀛楁锛涘崟渚嬫敞鍐岃〃閲嶇疆锛堟祴璇曢殧绂伙級锛沷ptions value 鏀寔 number/boolean锛沝efaultValue 绫诲瀷绾︽潫锛涘睘鎬?dependsOn 鏉′欢鏄剧ず锛泆nregister/has/clear 娉ㄥ唽琛ㄦ搷浣滐紱鏃犻殰纰?ariaProps/role锛涘姩鐢?transition 灞炴€э紱richText 鏀圭湡瀹炲瘜鏂囨湰缂栬緫鍣紱code 瀛楁璇硶楂樹寒锛沬18n 閿欒鎻愮ず鏈湴鍖栵紱娉ㄩ噴璁℃暟鐭涚浘淇锛沢enerator props鈫扟SX 鑷姩鎺ㄥ銆傝繖浜涘睘 P2 鎴栦唬鐮佽川閲忓眰闈紝涓嶉樆鏂牳蹇冨伐浣滄祦锛屽彲鍦?F-R18 鏋舵瀯鍋ュ悍娌荤悊鏈熼棿瑙嗘儏绾冲叆銆?|
| 2026-06-23 | **Domain L 全域实现 (ISC-L1~L7 ✅ PASS):** (1) generateDataBindings 替换 TODO 为真实 Supabase + TanStack Query 代码生成 (2) component-map dataBindingAttrs 注入 data/column 属性 (3) 自动去重同表查询 (4) searchParams/params 参数绑定 (5) 10 个新数据绑定测试。engine 84+generator 37=121 测试通过。 |
| 2026-06-23 | **Domain K 鍏ㄥ煙瀹炵幇 (ISC-K1~K7 鉁?PASS):** (1) eventBindings 鏀逛负 Record<string, string[]> 鏀寔澶?flow缁戝畾 (2) FlowBindingStore 鏁村悎/澶?flow 鏀寔/姝讳唬鐮佸垹闄?(3) page-generator 鐢熸垚 const flowResult = await callFlow 淇濈暀杩斿洖鍊?(4) 鐢熸垚 lib/store/app-store.ts Zustand + client.ts 鍥炲啓 setFlowResult (5) component-map flowOutputAttrs data-flow-output 鍝嶅簲寮忚闃?(6) onPageLoad useEffect 姝ｇ‘娉ㄥ叆銆傚悓鏃朵慨澶?I/J/N 鍩熷瓙浠ｇ悊瀵艰嚧鐨勮嚜妫€闂銆俥ngine 84+generator 23=107 娴嬭瘯閫氳繃銆?|

---

## Verification

*鏈妭鍦?Phase 6: VERIFY 濉厖銆傚綋鍓嶆棤宸查獙璇佹潯鐩€傞獙璇佹椂姣忔潯 ISC 闇€鎻愪緵宸ュ叿璇佹嵁锛堟祴璇曡緭鍑?diff/鎴浘/鏋勫缓鏃ュ織锛夛紝绂佹"搴旇宸ヤ綔"寮忔柇瑷€銆?

| Criteria | Status | Evidence |
|----------|--------|----------|
| ISC-K1 | 鉁?PASS | eventBindings Record<string, string[]> + EventBindField multi-flow select/input |
| ISC-K2 | 鉁?PASS | bindableEvents whitelist on MaterialDefinition (via U14) |
| ISC-K3 | 鉁?PASS | FlowBindingStore bindEvent/getEventBinding/getEventBindings 鏁村悎澶?flow锛屽垹闄ゆ浠ｇ爜 |
| ISC-K4 | 鉁?PASS | page-generator generateEventBindings 鐢熸垚 const flowResult = await callFlow(...) |
| ISC-K5 | 鉁?PASS | 鐢熸垚 lib/store/app-store.ts (Zustand flowResults + setFlowResult) + client.ts setFlowResult |
| ISC-K6 | 鉁?PASS | component-map flowOutputAttrs 鐢熸垚 data-flow-output={useAppStore(s => s.flowResults["flowId"])} |
| ISC-K7 | 鉁?PASS | onPageLoad/onPageUnload 鐢熸垚 useEffect + 渚濊禆娉ㄥ叆(async IIFE) |
| ISC-N1~N10 | 鉁?PASS | 瀹屾暣鍥捐繍琛屾椂: topoSort(鍏ュ害琛?BFS), executeNode(17鑺傜偣绫诲瀷), resolveTemplates, runFlow(甯﹀垎鏀烦杩?閿欒澶勭悊+鏃ュ織) |
| ISC-I1~I8 | 鉁?PASS | 澹版槑寮?Slot 绯荤粺: slot-engine.ts(SimpleSlot/ArraySlot), custom-syncs.ts(11缁勪欢), 16鐗╂枡slots澹版槑 |
| ISC-J1~J8 | 鉁?PASS | 鐗╂枡鏋舵瀯: shadcnImport瀛楁, buildComponentMap/buildShadcnImportMap, registerAsync, validateProps |
| ISC-R8 | 鉁?PASS | _globalCtrlDown 妯″潡绾х姸鎬佲啋React Context CtrlProvider+useCtrlDown |
| ISC-R10 | 鉁?PASS | 8澶?window.alert鈫抯onner toast.error |
| ISC-R7 | 鉁?PASS | CanvasComponentItem React.memo |
| ISC-H13 | 鉁?PASS | Page Settings 鐙珛 Collapsible 闈㈡澘 |
| ISC-H12 | 鉁?PASS | updateNode 鍘嗗彶 coalesce 250ms prop 鍚堝苟 |
| ISC-H10 | 鉁?PASS | ImageField 涓婁紶绔偣鍙厤缃?uploadEndpoint |
| ISC-H3 | 鉁?PASS | required 瀛楁绌哄€肩孩鑹茶竟妗?+ 淇濆瓨鎷︽埅 |
| ISC-C3 | 鉁?PASS | 瑙嗗彛鍒囨崲鈫抔ridCols 绾ц仈 mobile4/tablet8/desktop12 |
| ISC-B6 | 鉁?PASS | 瀹瑰櫒鎷栧叆鍩轰簬榧犳爣Y璁＄畻鎻掑叆浣嶇疆绱㈠紩 |
| ISC-B5 | 鉁?PASS | DragOverlay MaterialThumbnail 缂╃暐鍥?|
| ISC-B1/B2/B3 | 鉁?PASS | 钀界偣鎸囩ず鍣?缁濆鍧愭爣+pan/zoom琛ュ伩 |
| ISC-A8/A9/A10 | 鉁?PASS | 灏哄tooltip+hover鍚嶇О鏍囩+缃戞牸瀵规瘮搴?|
| ISC-A5 | 鉁?PASS | 鏈煡绫诲瀷 fallback 鏄剧ず name+props 鎻愮ず |

---

## 闄勶細鐢ㄦ埛宸ヤ綔娴佺洰鏍囧害閲?

**鍩哄噯锛堝綋鍓嶏級**锛氬垱寤哄甫鏁版嵁缁戝畾鐨勬敞鍐岃〃鍗曢〉 鈮?24 姝ワ紝璺?3 娆℃ā寮忓垏鎹紝2 娆℃墜鏁茬粦瀹氾紝棰勮涓嶅彲浜や簰楠岃瘉銆?

**鐩爣锛堥噸鏋勫悗锛?*锛氣墹 10 姝モ€斺€?
1. 鎷栧叆"Form Group"澶嶅悎鐗╂枡锛堝惈 Label+Input+鏍￠獙锛?脳 3
2. 鎷栧叆 Button
3. 閫変腑 Input 鈫?dataBinding 涓嬫媺閫?users.name锛堣嚜鍔ㄨˉ鍏級
4. 閫変腑 Button 鈫?eventBinding 涓嬫媺閫?send-welcome flow
5. 鐐瑰嚮 Preview 鈫?鐐瑰嚮鎸夐挳 鈫?toast 鎻愮ず"灏嗚Е鍙?send-welcome"
6. Ctrl+S 淇濆瓨

**搴﹂噺瑙勫垯**锛氫互瀹屾垚鐩稿悓浜х墿鐨勭敤鎴锋搷浣滄鏁颁负楠屾敹鏍囧噯锛岃€岄潪 ISC 閫氳繃鏁般€侷SC 鏄墜娈碉紝姝ユ暟鏄洰鏍囥€?







