import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const WOREDAS: { name: string; isTown?: boolean }[] = [
  { name: 'Metu Ketema', isTown: true }, // zonal capital town administration
  { name: 'Metu' },
  { name: 'Alle' },
  { name: 'Bacho' },
  { name: 'Bilo Nopa' },
  { name: 'Bure' },
  { name: 'Darimu' },
  { name: 'Didu' },
  { name: 'Doranni' },
  { name: 'Halu' },
  { name: 'Hurumu' },
  { name: 'Nono Sele' },
  { name: 'Yayo' },
];

const DEPARTMENTS = [
  { name: 'Agriculture and Natural Resources', slug: 'agriculture' },
  { name: 'Health', slug: 'health' },
  { name: 'Education', slug: 'education' },
  { name: 'Land Administration and Use', slug: 'land-administration' },
  { name: 'Trade and Industry', slug: 'trade-industry' },
  { name: 'Justice', slug: 'justice' },
  { name: 'Finance and Economic Development', slug: 'finance' },
  { name: 'Women, Children and Social Affairs', slug: 'social-affairs' },
];
// Auto-generated from official zone document — historical sites

const HISTORICAL_SITES = [
  {
    titleOm: `Injifannoo Dirree Waraana Saambee`,
    title: `Sambo Battlefield`,
    bodyOm: `1-Injifannoo Dirree Waraana Saambee

Waraanni Xaaliyaanii Ebla 27 bara 1928 magaalaa guddoo Itiyoophiyaa Finfinnee qabachuuf yaaliiwwan garaa garaa taasisaa akka ture ragaaleen seenaa ni ibsu.

Haata’u malee waraanni xaaliyaanii haala inni hin eegneen mul’atnisaa karaatti hafuu danda’eera.

Innis Magaalaan guddoo biyyattii Finfinneerraa gara Magaalaa Goreetti darbuusaati.

Magaala Finfinnee qabachuuf sardamaa kan ture Waraanni xaaliyaanii Magaalaan Goree Finfinneerraa fageenyarratti akka argamtu, magaalaa Goree qabachuufis xaarii guddaa akka barbaaduu yoo dhagahu abdii kutate.

Xaaliyaaniin abdii kutattus Waraana jeneraal Maaltaan hoogganamu karaa Jimmaatiin gara Goreetti erga.

Yeroo sanattu waraanni Iluu Abbaa Boor irraa ka’e Ogaadeenitti duulee ture.

Waraana ogaadeenitti duule keessaa kan qabsoorratti wareegame akkuma jirutti ta’ee, kan wareegamarraa hafe waraanni kumni 20’n gara Iluutti deebi’uun diinni magaalaa Goree akka hin qabanneef loluu eegala.

Waraanni Jeneraal Maaltaan durfamus gara magaalaa Goreetti dhiyaata.

Mootii Hayilesillaasee bakka bu’uun Goree bulchaa kan turan Walda Tsaadiq, waraanni xaaliyaanii karaa kibbaatiin cabsee Goree akka hin gallee, akka ittisuuf hooggantoota isaanii gara Saambeetti ergu.

Jeneraal Maaltaanis garee waraanaa tokko karaa Aalleefi Karaa Hadiyyaatiin Dirree waraana Saambeetti ergu.

Barreeffama keenyaafi Injifannoo dirree Waraana Saambeef ka’umsa kan taate Saambeen Godina Iluu Abbaa Boor, Aanaa Aallee Magaalaa Goree irraa gara kibbaatti km.17 fagaattee argamti.

Waraanni faashiistii karaa kibbaatiin Magaalaa Goree qabachuuf gootota biyya keenyaa waliin waraana eegalti.

Gidduuttis nama Giraazmaach Dhaabaa Qambuu jedhaman boojiti.

Gara magaalaa Goreetti fiduun, walakkaa magaalaatti fannisuun namoonni kaan isaan ilaalanii akka harka kennan doorsisu. Isaan boodas Giraazmaach Dhaabaa Qambuu gizootiidhaan hidhamanii akka taa’an goti.

Ummatni gocha xaaliyaanii arge garuu harka kennuurraa gootummaa caaluutu itti dhaga’ame.

Diinatti harka hin kenninu jechuun didu. Yeroo sana mootii Hayilesillaaseen Ingiliiziin turani. Ummannis gara masaraa mootii Hayilesillaasee, magaalaa Goree jiru deemuun Hayilesillaaseetti bilbila bilbiluun ajaja adda fudhachuu eegale.

Mootii Hayilesillaasees biyya Ingilizii taa’anii bilbilaan ajaja dabarsu.

Waraanni Fitaawuraarii Kabbadaa Walda Yohaannisiin hogganamu karaa kibbaatiin hanga Teeppiitti akka waraanu, gareen Dajjaazmaach Gazahaanyiin hogganamummoo Gimirii kaasee gara kaabaatiin hanga Saambeetti akka waraanu ajaja kennu.

Ajajaafi Waraana kanaanis waraanni Xaaliyaanii 300 taatu gara Maashaatti baqachusee seenaan ni hima.

Namni Abbaa Xaaloo jedhamanis kallattii maashaafi Goreetiin Xaaliyaanitti karaa cufu.

Waraanni Xaaliyaanii maashaatti baqattes karaa diiduutiin cabsitee darbuun loltoota Xaaliyaanii kan birootti makamti.

Waraanni xaaliyaaniis kallattii maashaafi Goreetiin karaan cufamuu oduu dhageessi.

Kana erga dhageessee boodas, naasuudhaan kallattii kibbaarra dhufuun Madfiifi Matarayyasiin karaa cufanii, miira sodaatiin namicha karaa cufe eeggachuu eegalan.

Lixa Itoophiyaa kan ture waraanni Yaxqur Anbassaa jedhamu yeroo dheeraadhaaf diina waliin falmaa akka ture ragaaleen ni ibsu.

Keessumattuu konyaa Yeekiidhaafi Gimiraa jedhamutti, ji’a 7 guutuu diinni gara Goreetti akka hin dabarre meeshaa waraanaa Ingilizootaan deeggaramanii ittisaa turaniiru.

Isaan boodas xaaliyaaniirratti waraana cimaa banuun, diina mancaasuun, gootota Dajjaazmach Kabbadaa Waldayasiin hoogganamutti akka makaman ragaaleen ni ibsu.

Waraanni kun ittiaanaa ajajaa waraanaa Shaambal Waldayas Bulukkootiin hoogganamaa, naannoo magaalaa Goree erga bilisa baasanii booda Alaabaa Itoophiyaa bakka hundatti fannisanii bilisummaa koonyaa Goree ibsaniiru.

Yeroo kannatti waraanni Xaaliyaanii Baateloonii 12 ta’an dhuma daangaa biyyattii jiran hundumtuu karaa Kibbaa , Galabii fi Gimiraan gara magaalaa Goreetti dhufuuf karoorsu.

Odeeffannoon kunis waraana goototaa Itiyoophiyaa dhaqaba. ummanni naannoo saambees gootota Itoophiyaa waliin ta’uun akka waraanni Xaaliyaanii Goreetti hin ceene gochuu eegala.

Waraanni Shaambal Bulukkoon hoogganamus ummata naannoo waliin ta’uun karaa darba isaanii kan ta’e Riqicha Qabar meetira 90 dheeratu diiga, addaan kuta.Gootota Oromoo namoota naannoo saambee gurmeessuun Riqicha Qabar addaan kutan keessaa Obbo Zawudee Lamuu, Ayyaansoo Bookaa, Margoo Bookaa, Nageessoo Giiloo isaan muraasa.

Loltoonni Xaaliyaaniis aariidhaan Gaarreen Saambee irratti Madfii fi matarayyasii dhukaasuu eegalu. Lollis saambeerratti cimee itti fufe.

Karaa bahaatiin waraanni Waldayas bulukkoon hoogganamu, karaa kibbaatiin waraanni Beenchii shawoon hoogganamu, karaa kaabaatiin waraanni Goree irratti argamu Alaabaa biyyaalessaa qabachuun Xaaliyaanii gidduutti galchanii waraanuu akka eegalan ragaaleen seenaa arganne ni ibsu.

Ummannis tarkaanfii goototaatti gammaduun walakkeessa magaalaa Goreetti Alaabaa biyyoolessaa dhaabuun, gammachuudhaan magaalaa keessa sirbaa deemuu eegala.

Waxabajjii 27 bara 1933 naannoo magaalaa Goreetti dhiyaatee kan ture waraannii Xaaliyaanii harka kennachuusaa, Adoolessa 4 bara 1933 waraana cimaa Xaaliyaanota irratti banameen madfiin 9, Matarayyassiin 46fi meeshaalee waraanaa xixiqqaa kumni 20 booji’amuu ragaaleen ni ibsu.

Meeshaaleen booji’aman konkolaataatti fe’amee Finfinneetti ergamuun poolisiifi loltoota mootummaaf qoodamuun isaas ni himama.

Waraana Xaaliyaanii Kuma 12 fi 786 Saambeerratti lolaa turan keessaa, kumni 7 fi 575 harka kennachuufi booji’amuu ragaaleen ni ibsu.

Xaaliyaanonni kuma 5 ol ta’an immoo Saambeerratti wareegamaniiru.

Kanneen Cooraa fi Beddelleetti booji’amani dabalatee Waliigalatti loltoonni kuma 14 fi 750 karaa Ambootiin gara Finfinneetti ergamuuni isaaniis akkuma kana.Gootota Oromoo Waraana Saambeerratti hirmaachuun Xaaliyaanii fuuldura dhaabachuun qabsaa’an keessaa Zawudee Lamuu, Ayyaansoo Bookaa, Margoo Bookaa, Nageessoo Giiloo, Jaarsoo Abbaa Diidaa, Margoo Faarsoo, Guutamaa Shoroo,Gobbuu Wayyeessaa, Qilxuu Raaboo, Tonoosoo Abbaa Diiduu warreen muraasa.`,
  },
  {
    titleOm: `Qarsaa Googillaa`,
    title: `Qarsaa Googilaa`,
    bodyOm: `2.Qarsaa Googillaa

Qarsaa Googillaa iddoon jedhamu kan inni argamu Godina Iluu Abbaa Booraa Aanaa Mattuu ganda Madee keessatti yoo ta’u; Bakki kun kallattii Lixaatiin daandii gara Goreetti geessu irra cinaa magaalaa Mattuutti argama. Moggaasni maqaa iddoo kanaas maqaa nama Gaawoo Gillaa jedhamau irraa dhufe. Seenaan bakki kun qabus bara 1875tti humni nafxanyaa Raas Tasammaa Naadoon durfamuu fi humni Waraana Oromoo Iluu Abbaa Boora kan Fatasnaa Iluun dursamu wal waraananii dhuma irratti humni waraana Fatansaa bakka itti injifatameedha. Bakki kun har’a bakka seena-qabeessa Aanaa Mattuu keessaa is tokko ta’uun, Ayyaanni uurizimii akka aanichaatti yeroo lamaaf bakka itti kabajameedha(Waajjira Aadaafi Tuurizimii Aanichaa).`,
  },
  {
    titleOm: `Tulluu Gurraachoo`,
    title: `Tulluu Gurraachoo (Black Mountain)`,
    bodyOm: `3-Tulluu Gurraachoo

Tulluu Gurraachhoo kan inni argamu Godina Iluu Abbaa Booraa Aanaa Mattuu ganda Barrooyyii gabbisaa jedhamu keessatti. Tulluun kun moggaasa kana kan argate yeroo hundumaa dumeessi/huurriin waan irraa hi dahbamneef gurraach’aee fageenya irraa waan mul’atuuf Tulluu Gurraachoo jedhamee akka waamame ni eerama.

Tuulluun Gurraachoo Godina Iluu Abbaa Booraatti olka’insa qabuun sadrkaa tokkoffaa irratti kan argamu yoo ta’u, tilmaamaan dheerina faana kuma sadii (3000) caalu qaba. Jala isaatii kaasee fiixee isaa irra ga’uuf adeemsa sa’aatii tkko caalu fudhata. Walakkeessaa tulluu kanaa irratti daqiiqaa soddoma(00:30) booda holqa guddaatu argama. Holqi kun dheerinni isaa tilmamaan meetira shantama (50m) hojjaan isaa meetira jaahatama(60), bal’inni isaa meetira shan(5m) ni caala.

Fiixee Tulluu Gurraachoo kanarra dhaabatee nama asiifi achi ilaaleef aanaaleen ollaa Mattuutti argaman kan Aallee, Buree, Daarimuu, Algee, Hurrumuu, Biloo Noophaa fi akkasumas kan akka Dambidoolloo, Gambeellaa fi kkf fageenyaarraa of jalatti ilaaluun ni danda’ama. (Waajjira Aadaafi Tuurizimii Aanichaa)`,
  },
  {
    titleOm: `Genee Yookiin Fincaa'aa Qabar`,
    title: `Genee / Qabar Falls`,
    bodyOm: `4-Genee Yookiin Fincaa’aa Qabar

Geneen Qabar Godina Iluu Abbaa Booraa Aanaa Mattuu ganda Toobbachaa iddoo addaa Janeetii jedhamu keessatti argama. Fincaa’aan kun Magaalaa Mattuurraa fageenya Kiiloomeetira kudhalama (121km) irratti aragma. Genee Qabar kana keessatti haammatamanii kana argamanu finca’aa, haroo, Holqaaafi biqiloota uumamaa gosa adda addaati. Fincaa’aan Qabar tilmaamaan hanga meetira soddomii sahnii kan dheeratu yoo ta’u, Haroon Qabar immoo fincaa’aa dhuma baga kana irra gad darbartamuun kan uumamee jiru yoo ta’u tilmaamaan bal’ina iskuweer meetira soddomaa fi gadi fageenya meetira digdamaa (20m) kan qabudha.

Fincaa’aan, haroo fi holqi bosonaan marfamee argama. Bosona kana keessatti gosoota mukaa fi hidda akaakuu adda addaatu argama. Gosoota mukaaa keessa waddeessa, qaraaroo, hoomii, bosoqa, ambabbeessa, harbuu gosoota hiddaa keessaa immoo kan akka xiwoo, liqixiifi Geebboo eeruun ni danda’ama. Kanaan alatti bunni uumamaas bosona kana keessatti ni argama(Waajjira Aadaafi Tuurizimii Aanaa Mattuu).

Geneen Qabar kanaan dura sirna Hayila Sillaasee keessa Godina Iluu Abbaa Booraa kan bulchaa ture Dajjaazmaach Warquu Inqusillaaseen Waggaatti uummata gandichaa waliin korma qalanii warra adii biyya alaa fi maatii isaanii dabalatanii naannichatti bashannanaa akka turan jiraattonni ni ibsu.`,
  },
  {
    titleOm: `Kaabii Fatansaa Iluu`,
    title: `Kaabii Fatansaa Ilu`,
    bodyOm: `5.  Kaabii Fatansaa Iluu

Kaabii jechuun awwaala durii kan aakka aadaa Oromootti namni beekamaan tokko yeroo du’u akka namni sun seenaan isaa hin hirraanfatamneef, awwaala isaa biyyoo fi dhagaadhaan kaabanii lafarraa ol kaasanii mul’isaniidha. Kanaafuu, kaabiiFatansaa Iluu jechuun awwaala isaa jechuudha. Algaa gurraachan immoo maqaa ganda kaabiin sun keessatti argamuuti. Amantiin Fatansaa Iluu Amantii Oromoo Waaqeffataa ture.

Kaabiin Fatansaa Iluu/abba Ayyaansoo Godina Iluu Abbaa Booraa Aanaa Mattuu ganda Algaa Gurraacha keessatti kan argamu yoo ta’u, umurii waggaa dhibba tokkoo fi soddomaa ol (130) kan lakkoofsisedha. Fatansan Iluu goota beekamaa Godina Iluu Abbaa Booraa si’a ta’u nafxanyaaf jilbeeffachuu didee osoo loluu qabamee to’annaa jala oolee osoo jiru dhukkubsatee duunaan uummata naannoo ganada Algaa Gurraachaatiin awwaalamee kaabiin itti ijaarame (Waajjira Aadaafi Tuurizimii Aanaa Mattuu).

Kaabiin Fatansaa Iluu ganda Algaa Gurraachaa keessatti kan argamu kun magaala Mattuu irraa gara lixaatti fageenya kiiloomeetira afurtamii lama (42km) irratti argama. Kaabiin Fatansaa Iluu ol ka’insa meetira ja’a (6m) kan qabuu fi dherinni naannoo ammo giddu-galeessaan meetira ja’aa (6) yoo ta’u, naannoo mana jireenyaa obboo ayyaanaa Disaasaa Amuumaa jedhamutti argama. Akka Aanaa Mattuutti guyyaa tuurizimii bara 2005 bakk kaabiin kun argamutti uummata naannoo kanatti waliin sirna ho’aadhaan kabajamee jira.`,
  },
  {
    titleOm: `Seenaa Hiikaa Awaajii (Abbaa Gammachis)`,
    title: `Onesmos Nasib (Hiikaa Awaajii)`,
    bodyOm: `6- Seenaa Hiikaa Awaajii(Abbaa Gammachis)

Seenaan Ogbarruu Oromoo sirna gabrummaa jaarraa 19ffaa keessa Itoophiyaa keessatti babal’ateen wal qabata.Jaarraa kana keessa sababii daldala garbaan kutaalee biyyattii garaa garaa keessaa dargaggoonni hedduun ukkaamsamanii fudhatamaa turan.Keessumattuu Oromiyaa keessaa dargaggoonni baay’een qabamanii gurguraman kunneen akkuma meeshaa gara biyyoota Awuroophaa fi Arabaatti bal’inaan gessamaa turan…Survey of Oromo Litrature,mojule 301 (2010)

Dargaggoonni Waaree fi Gaboo jedhaman bara 1830 A.LA. keessa Limmuu irraa fudhatamanii gab-rummaa dhaan gara ardii Awuroophaatti gurguramuu isaanii,Oshuu Aagaa ilmi oromoo mana sibuu bakka urgeessaa jedhamuu ijoollummaatti qabamee Kaayirootti gurguramuu isaa, Akka fedhee Daallees osoo horii tiksuu saamtotaan qabamee Gondaritti geessamee akka gurgurame kitaabni olitti tuqame kun ni ibsa.Survey of Oromo literature mojule 301(2010:11-13)

Kitaabni Sakatta’a Ogbarruu (2003:37-39) akka ibsutti Ilmi Oromoo bara 1850 keessa dhalate Hiikaa Awaajiis carraan warra kaanii akka isa mudate ibsa.

Hiikaan dhalatee waggaa afurii abbaan isaa irraa du’e Namoonni naannoo sana jiraatan gosaan wal qoodanii wal lolaa turan.Haaluma kanaan bakka Hiikaan jiraachaa turetti lolli kaanaan hayyoon Hiikaa ijoolleeshee fudhattee deemte. Erga lolli qabbanaa’ee booda gara qe’eesheetti deebite.Garuu osoo hin yaadin gaaf tokko diinni isaanirra bahe.Haati Hiikaa,Hiikaa bay’ee jaalatti turte.Mucaashee baay’ee jaalattu kana diinni sootalaa fi bakara itti mirmirsee sodaachisuun harkaa baafatee fudhatee deemuun gatii loon afuriitti gurgurate.Erga gurguramee nama isa bite bira waggaa lama taa’e.Namichi isa bite kunis rifeensa irraa aadee boca adda addaa itti baasee gabaa baase.Namoonni isa irraa bitatan lamaan irratti wal lolanii inni tokko isa biraa ajjeese.Inni ajjeesee oolfate sunis amoolee dhibba lamatti gurgurate.Inni amma bite kun ammoo gatii guddaatti gurgurachuuf gara Mitsawwaatti geesse.

Onkoloolessa 1870 gurguramuu dhaaf fuula faranjii bulguu jedhee sodaatutti dhiyaate.Yeroo kana Hiikaatti lafti dukkanoofte.Booda dubbiin akka inni yaade hin taane.<< hin yaadda’in kana booda nama gara biraatti dabarsee sinkennu >> yeroo inni jedhuun dhugaa itti hin fakkaanne.

Bara 1871 muzinger akka inni baratuuf Hiikaa mana barumsaa mishinii kan warra Siwidiin achi jirutti kenne.Yeroo sana itti gaafatamaan mana barumsichaa Beengit Piiter Lundihal ture.Hiikaan barumsa isaa waggaa tokkoof erga hordofee booda bara 1872 guyyaa Faasikaa cuuphamee maqaa Onesmos Nasiib jedhamu argate.Hiikni isaas faayida qabeessa jechuu dha.Onesmos lubicha biratti baayyee jaalatama ture.Yeroo adeeman illee adda hin bahan ture.

Yeroo sana yaadi Onesmos keessa jiru waa tokko ture.gara lammiisaa deemee barumsa ofii argate barsiisuu.Yaadni kun baay’ee boqonnaa isa dhowwa ture.Halkan halkan akka imimmaan cobsetti bula .Lapheen isaa baay’e cabee <yaa Waaqayyoo yoom biyya abbaa kootti na deebista laata…deemee lammii koo barsiisuuf hangam na tursita laata ?> jechuun kadhata ture.

Hawwiin Onesmos garuu yeroof dafee fiixaan kan bahe hin turre.Waxabjjii 25,1876 gara Istookholm deemee dhaabbata <<Theological Institute of Jhonelund>> jedhamurraa barumsa isaa akka baratuuf murtaa’e.Waggaa shaniif barumsa isaa erga hordofee booda bara 1881 ji’a Onkoloolessaa keessa gara Mitsawaatti deebi’ee, Dippiloomaa isaa barsiisaa wangeelaatiin akka fudhatu ta’e.Erga biyyatti deebi’ee boodas gaa’ilaan dubartii Mihirat hayiluu jedhamtu kaadhimmate.

Bara 1882 ji’a Amajjii keessa haadha manaa isaa, luba Saamu’eel,Hayiluu fi Filiphoos namoota jedhaman waliin gara biyya oromootti deemsa eegale.Karaansaa dadhabsiisaa fi qilleensa baayyee qaba ture.Rakkoo hedduu booda Bitootessa 2,1882 Fanakaa Laga Naayil qarqara gahan.Fanakaa irraa deemsa ji’a tokkoo booda gahan.Fanakaa irraa adeemsa erga qajeelanii booda magaalaa daangaarratti argamtu tokko gahanii oduu gaddisiisaa tokko dhagahan.Daangaarra waan lolli jiruuf nageenyi akka hin jirre. Kanaaf gara duubaatti deebi’uuf dirqaman.Yeroo sana adeemsi isaanii gammoojjii Nuubiyaa keessa darba waan ta’eef obonboleettii, dhabiinsa bishaanii fi busaa dhaan baay’ee dararaman.Miiltoo isaanii keessaa Filiphoosiin dhaban.Onesmos hedduu waan dhukkubsateef lubichi Saamu’eel baay’ee nahe. Haa ta’u malee Onesmos erga fayyee booda lubichi dhukkubsatee fayyuu hin dandeenye.Achuma gammoojjii Nuubiyaa keessatti hafe.Rakkoo kana hunda keessa bahanii Adoolessa 1882 Onesmosii fi haati manaasaa ,akkasumas Hayiluun Imkuluu gahan.Sakatta’insa Ogbarruu mojula 301(2003:37-39).

Onesmos bara 1884 Shawaa keessa darbuu dhaan gara Jimmaa akka deemaniif eyyema Minilik irraa argate.Daldaltoota showaa fi Mitsawaa gidduu adeeman waliin adeemsa eegalan.Naannoo Affaar erga gahanii booda saamtonni dhukaasa itti bananii namoota kudha lama ajjeesuu dhaan namoota saddeet ammoo madeessanii adeemsa ji’a tokkoo booda showaa gahan.Haa ta’u malee Minilik showaa keessa akka hin darbine isaan dhorke. Sababni isaas mootii Tigiree kan ture Yohaannis namoota kana gara jimmaatti akka isaan hin dabarre akka dhorku waan itti himameefi.Haaluma kanaan Aliyyuu Ambaa lafa jedhamu akka turan godhe.Sanaan booda Onesmos gara Eertiraatti deebi’e.Erga deebiee boodas barsiisuu fi macaafa qulqulluu hiikuu itti fufe.

Haalli kun hundi walitti ida’amee Onesmosiin gadda guddaarra buuse.Gadda kana irraanfachuuf jecha hojiisaa cimsee itti fufe.Jechoota Afaan Oromoo kuma jaha walitti qabee maxxansiisee jira.Walumaa galatti Onesmos Asteer Gannoo waliin ta’uun kitaabilee torba maxxansiiseera.

Akka Moojuliin sakatta’a ogbarruu (2003:41-42) jedhutti kitaabileen Onesmos tumsa Asteer Gannootiin barreesse

1-Bara 1887 Galata Waaqayyoo Gooftaa Maccaa (Prais be to God, the lord of multitiude)

2-Bara 1893 Macaafa Qulqulluu Kakuu Haaraa jijjiireera.

3- Bara1894 Jalqaba Barsiisaa kitaaba fuula 174 qabu barreesse.

4-Bara 1897 Macaafa Qulqulluu Kakuu Haaraa fi Moofaa jijjiireera

Haa ta’u malee hojiin kun waggaa 13 kan itti fixe yemmuu ta’u kitaaba kana maxxansiisuuf ammoo gara Kirishoonaa (Siwizerlaand) deemuun dirqama itti ta’e.utuu achi jiruu intallii tokko dhukkubsattee akka duutee fi ijoolleen isaa lamaanis akka dhukkubsatan yemmuu dhagahu baay’ee gaddee gara Mitsawaatti deebi’uuf jedhu Haati manaasaa Liidiyaan xalayaa barreessitee << kan du’e du’eeraa isa jirummoo Waaqayyotu eega,ati garuu hojii qabdee jirtu itti fufi jettee waan jajjabeessiteef hojiisaa itti fufe.

Yeroon gahee maxxansaan macaafa qulqulluus waxabajjii 10,1899 raawwate.

5-Bara 1899 kitaabilee lama afaan Ingiliziirraa gara afaan oromootti jijjiire.kitaabin jalqabaa macaafa Luter Katekizim,Luuter nama jedhamuun kan barreeffame dha.

6- Inni lammaffaa ammoo bara 1899 kitaaba Garaa namaa jedhu afaan Ingiliziirraa gara afaan Oromootti jijjiireera.

7-Kitaabni < Birth Bible History> jedhus baruma kana keessa akka maxxansiise ibsa.

Hojiin Onesmos ogbarruu Oromoo guddisuu keessatti taasisaa ture kitaabilee ogbarruu Oromoof jalqaba ta’an qofa barreessuun hin daangofne. Dabalataan Afaan Oromoo gargaaramee sabasaa wangeela barsiisuuf carraaqqii guddaa taasisaa turuu isaa seenaan akka agarsiisu ragaan kun ni dubbata. Bu’uuruma kanaan Onesmos Abbaa Ogbarruu Afaan Oromoo jedhamee waamame.Haa ta’u malee,kaayyoo isaa kana galmaan gahuuf yaalii Onesmos gara biyyaatti deebi’uu yeroo garaagaraa waan jalaa fashalaa’eef umuriin isaas baay’ee waan deemeef (47) hojii kitaaba jijjiiruu qofarratti bobba’ee ture.Haalonni adda addaa murtoo Onesmosiin jijjiiruu waan dirqamsiisaniif Asmaraa keesa taa’uu dhiisee wangeelaa fi ogbarruu Oromoo saba oromoo barsiisuu adeemsa eegale.Adeemsi isaa akka yeroo duraanii hin turre.Mistawaa irraa hanga Jibuutiitti bidiruu hurkaan sochootun deeman. Bara 1902 kan baname karaan Baaburaa adeemsa isaanii jibuutii fi Finfinnee giduu akka salphiseef himama. Onesmos hiriyoota fi maatii isaa waliin Finfinnee erga gahanii booda Minilikiin eyyema gaafatan.Innis nama isaan gargaaru Naggaadiraas Hayila Giyoorgis jedhamu ramadeef. Adeemsa gara Wallaggaatti itti fufanii bara 1904 Naqamtee gahan.Onesmos Fulbaana 1904 ijoollee digdama galmeessee kutaa sadiitti hiruu dhaan barsiisuu eegale.

Barnoonni Afaan Oromootiin kennamu akka gaariitti baba’lachaa deemuunsaa diinota baay’ee itti hore;Qeesota tokko tokkos inaafsisuu jalqabe.

Dhimmi kun Dajjaazmaach Kumsaattis himame. Innis namni Onesmos jedhamu barnoota gantuu barsiisaa akka jiru himatame.Dhimmi inni raawwataa jiru kun sirrii fi sirrii ta’uu dhiisuu isaa qoratamee barnoota kana dhaabee of duubatti akka deebi’u ta’e. Hojiin Onesmos geggeessaa jiru paatiriyaarkii mana amantaa Ortodooksiitiin mormiin itti ka’ee akka biyyaa ari’amuu fi barnootas akka hin barsiifne itti murtaa’e.Haaluma kanaan Onesmos Naqamtetti deebi’ee osoo barsiisuu umuriin isaas waan dadhabeef waxabajjii 23,1931Naqamteetti boqotee awwaalli isaa achuma naqamteetti raaw’ate.Sakatta’a ogbarruu oromoo moojula301 (2003:44-45).

Tasgaraa Hirphoo (1999 )Kitaaba Abbaa Gammachiis jedhu keessatti Hiikaan bara 1850 keessa kutaa biyya Iluu Abbaa Boor keessa iddoo Hurrumuu jedhamutti dhalate. Hurrumuun Mattuu irraa gara kiiloo meetira 17 fagaata.Naannoo inni dhalate Hurrumu keessaa bakka Ooggee jedhamutti.Qomoon isaa ammoo Waragoo jedhama.

Sabni Oromoo kutaa biyya sanaa keessa jiraatan waggaa dhibba tokko dura akkuma har’aa garri caalu horii horsiisuu fi midhaan qotachuu dhaan jiraatu turan Abbaanii fi haati hiikaa garuu horii horsiisuun jiraatu.Yeroon isaa bona ture, margi gognaan marga jiidhaa barbaacha horiisaanii ooffatanii lafa dheeraa deeman. Achitti diinni itti dhufee haadha Hiikaa harkaa Hiikaa fudhatanii deeman.Hiikaan guyyaa sanaa kaasee gabroomfame.Namoonni namoota gabroomfatan maqaa jijjiiru.Maqaan Hiikaas Nasiib jedhame.Nasiib maqaa garbaati . hiikni isaas kan milkii qabu ,isa nama badhaasu jechuu dha.Abbaa Gammachiis (1999:2-4).

Hiikaan akka booji’ameen Masawwaatti geessamee gurgurame.Hiikaa Awaajii yeroo Masawwaa ga’u dargaggeessa waggaa kudha afurii ture.Hurrumuu dhaa ka’ee hamma Masawwaa gahutti waggaa kudhan itti fudhate.Yeroo kana gidduutti harka nama sadii akka lixe ibsa.Inni jalqabaa gatii saawwa afuriitti isa gurgurate.Inni itti aanu gatii Amoolee dhibba lamatti dabarsee gurgurate.Akkuma kanaan Hiikaan yeroo saddeet akka gurguramee fi namichi xumurarratti isa bite Waarner Munziger Hiikaan kana booda akka hin gurguramne itti hime.

Haaluma kanaan warner Munzinger Hiikaa fidee ergamoota wangeelaa warra Suwidiinitti kenne. Tasgaraa Hirphoo (1999)

Kana malees barruun Makaana yasuus <Innahuwaati>;hundeeffamaa fi babal’inaa Waldaa warra Wangeelaa Makaana yasuus Itoophiyaa jedhu tokko akka ibsutti Onesmos maqaan dhalootaa isaa Hiikaa Awaajii jedhama.Onesmos Misiyoonotaa wajjin wal arguu kan danda’eef Mootummaa Naannoo Oromiyaa ammaa Zoonii Iluu Abbaa Boor jedhamu keessatti kan argamtu Hurrumuu, araddaa dhaloota isaarraa sababa gabrummaan qabamee deemuu isaatiini.Onesmos gurguramuurraa erga bilisoomee booda tajaajila wangeelaatiif mana barumsaatti akka ergame dha.Haaluma kanaanis tajaajilaa wangeelaa akka ta’e seenaan ni mirkaneessa jedha.Makaana yasuus Innahuwaat(2004:24).

Dabalataan kitaabni kun Onesmos Barsiisaa Wangeelaa ta’ee nama Kitaaba qulqulluu gara Afaan Oromootti hiike akka ta’e eera.

Dabalataan Kitaabni Barnoota Afaan Oromoo Kutaa 10ffaa waa’ee seenaa Onesmos Nasiib yemmuu ibsu Onesmos Nasiib naannawa bara 1856 dhiheenya, Godina Iluu Abbaa Booraa Magaalaa Hurrumuutti dhalate.Maqaansaa dhalootaa Hiikaa Awaajii Jedhama. Abbaan isaa Waggaa afuritti irraa du’e.Weerartoonni /Gabroomsitoonni saba biraarraa dhufan bara 1869 Hiikaa Haadha isaa jalaa hatuun maqaa haarawaa Nasiib jedhu moggaasaniifii akka garbaatti gurguratan.Sanaan boodas yeroo hedduu gurgurame. Walumaa galatti Nasiib yeroo saddeet gabrummaaf gurgurame.Dhumarratti itti aanaa itti gaafatamaa qonsiilaa Faransaayi kan ture namni Weener Munzinger jedhamu Magaalaa Mitsiwwaa qarqara Galaana Diimaatti isa argateee akka inni sanaan booda garbummaan hin gurguramne bilisa isa baase.Ergamtoonni lallabaa kitaaba Qulqulluu Siwidiin mana barnootaa ijoolleen dhiiraa qofti itti baratan iddoo Imkulluu jedhamuu waan qabanuuf Nasiib achi galee akka baratu taasisan. Nasiibis yeroo gabaabaa keessatti barataa cimaa dandettii addaa qabu akka ta’e mirkaneesse.Dhalate waggaa 16 gaafa Hiikaa/Faasikaa Bitootessa 31 bara 1872 cuubamee maqaan kiristaanummaa isaa Onesmos jedhamu mogga’eef. Onsesmos jechuun Afaan Giriikiitiin faayida qabessa jechuu dha.

Barnoota isaa waggaa shanitti xumuree itti aansuudhaan Dhaabbata Barnoota amantaa <Johaaneluundis> jedhamu kan Magaalaa Biroomaa, biyya Siwidiinitt argamutti ergamee waggoota shaniif barnoota amantaa olaanaa barate. Achii erga Mitsiwwaatti deebi’ee shamarree waggaa kudha sagalii Mihirat Hayiluu jedhamtu fuudhe.

Onesmos Nasiib uummata isaa Afaan Oromnoo barsiisuuf fedhii cimaan waan keessa jiruuf, haadha warraa isaa,abbaa ishii fi namoota biraa sadii waliin karaa Sudaaniitiin gara Wallaggaa seenuuf adeemsa eegale.Haa ta’u malee loltoonni Mooticha Minilik adeemsa isaanii kanatti gufuu waan ta’aniif Asoosaa darbuu dadhabanii gara magaalaa Faamaakoo daangaa Itoophiyaa fi Sudaanii jirtutti deebi’ani.Onesmosii fi miiltowwan isaa gara Kaartumitti deebi’uuf Ebila 12,bara 1882 Kaartum gahan.Kana booda Onesmos Imkulluutti debi’ee hojii isaa wangela barsiisuu itti fufe.Yeroo sanaa kaasee barreeffama adda addaa gara Afaan Oromootti hiikuu jalqabe. Erga yaalii inni bara 1886 gara Wallaggaa deemuuf taasise yeroo lammaffaaf gufatee booda kitaaba Qulqulluu guutumaa guutuutti gara afaan Oromootti hiikuu eegale.Haa ta’u malee Onesmos ijoollummsaarraa eegalee uummataa fi aadaa isaa keessatti waan hin guddanneef hanqina jechootaa fi jechamoota afaan oromoo waan qabuuf gargaarsa barbaaduuf dirqame.Akka carraa ta’ee shamarree Asteer Gannoo jedhamtu kan Iluu Abbaa Booraatii garbummaan gara Yamanitti osoo fudhatamaa jirtuu loltoota Ixaaliyaanii galaanaarraatiin bilisa baate Imkulluutti argate.Ishiinis hojii isaa barreeffamoota gara afaan Oromootti hiikuurratti gargaarsa olaanaa taasisteef.Gargaarsa ishiin taasifteefiin Kakuu Moofaa gara Afaan Oromootti hiikee Waxabajjii bara 1897 xumure.Bara 1904 gara wallaggaa deemuun yeroo duraatiif uummata isaatiif Afaan Oromootiin kitaaba Qulqulluu lallabuu eegale.Haa ta’u malee Qeesonni Amantaa Ortodooksii naannawa sanaa afaanicha waan hin dhageenyeef jibbiinsa cimaa irratti horatan.Kana malees kabajaa fi jaalala inni uummata Oromoo biratti horate waan isaan rifachiiseef sababa Maaramii kabaja dhorke jedhuun isa yakkanii Paatiriyarkii Ortodooksii kan ture Abuna Maatiyoos biratti akka dhiyaatu ta’e. Abunichiis himannaa qeesichi dhiyeesse irratti hundaa’uun Onesmos akka biyyaa bahu itti murteesse.

Onesmos Naqamteetti akka deebi’u ta’ee garuu sana booda gonkumaa lamuu akka wangeela hin lallabne itti murtaa’e.Onesmos sochii inni uummata bal’aa keessatti taasisu waan jalaa daanga’eef mana barumsaa naqamtetti bane keessatti barsiisaa ture.Onesmos hanga gaafa du’uutti barreeffamoota adda addaa gara afaan Oromootti hiikee raabsuu fikitaaba Qulqulluu barsiisuu kan itti fufe akka ta’e kitaabni kun ni ibsa.haaluma kanaan barreeffamoota Onesmos afaan Oromootiin qopheesse :Kitaaba xiqqaa mata duree < Onnee Namaa> jedhu kan fuula 100 qabu afaan Giriikiirraa gara Afaan oromootti hike.Bara 1892 kitaaba xiqqaa < Luuter Kaateekiizim > jedhamu afaan oromootti hiike.Bara 1885 gargaarsa Asteer Gannootiin Kuusaa jechoota Oromoo Siwidiin kan jechoota 600 qabu qophesse.Bara 1886 faaruu wangeelaa < Galata Waaqayyoo Guddaa> jedhu hiikee maxxanse.Bara 1894 tumsa Asteer Gannootiin kitaaba sheekkoo gabaabaa79 qabu maxxanse. Mata dureen kitaaba kanaas < Jalqaba dubbisaa jedhamu akka ta’e ibsa.Walumaa galatti Onesmos bara jireenya isaa hojii boonsaa hojjetee Waxabajjii 21, bara 1931 dhibee onneetiin qabamee addanyaa kanarraa akka boqote eera. Kitaaba Afaan Oromoo kutaa 10ffaa (2005:59-61).

Akka Barruun Seenaa Onesmos Nasiib Waajjira Aadaa fi Tuurizimii Aanaa Hurrumuutiin qophaa’e ( 2007) tokko ibsutti Hiikaan Godina Iluu Abbaa Boor Aana Hurrumuu Ganda Ooggeetti bara 1850 maatii tikfate bulaa qomoo Waragoo jedhamu irraa akka dhalate dha.kitaabileen tokko tokko garuu dhaloonni Hiikaa bara 1856 akka ta’e tuqu.Akka yaada barruu kanarraa hubachuun danda’amutti bara 1850 kana keessa Oromoonni naannoo sanaa fi Uummanni alaa sabaan wal qoodanii wal waraanaa akka turani dha. Kaayyoon waraana kanaas oromoota booji’uu fi Loon isaanii yaafachuu ture.

Oromoonnis yeroo hedduu weerartoota irra aanuun ofirraa deebisaa turanullee guyyaa tokko moo’amuun isaanii hin oolle.Weerartoonni injifannoo argatan kunneen haadha Hiikaa harkaa Hiikaa fi loon ishee fudhatanii bara 1870 Hiikaan Masawwaatti geessamee yeroo saddeet gurgurame.Namichi dura isa booji’e namoota lamatti gurgurat. Namoonni lamaan waan Hiikaa irratti wal dhabaniif inni tokko michuusaa ajjeesuu dhaan amoolee 200tti dabarsee gurgurate.Isa booda maqaansaa durii hafee < Nasiib > jedhame.Hiiknisaa bu’a qabeessa jechuu dha.

Namichi Nasiibiin xumura irratti bite Itti aanaan Qonsiilaa Faransaayi kan ture warner Musinger Onesmos guyyaa sanaa eegalee bakkaa bakkaatti gurguramuun isaa akka hafee fi bilisummaa akka argatee akkasumas gara jireenya haarawaatti tarkaanfachuu isaa barruun kun ni ibsa.Garuu kitaabni Afaan Oromoo kutaa 10ffaa warner Muzinger Onesmos Nasiibiin Magaalaa Mitsiwwaa qarqara Galaana Diimaatii akka argate ibsa.Namni kun Onesmosiin Mana Barumsaa Misiyoonaa Wangeelaa Siwidiin kan Masawwaatti dhaabbatetti galche.Nasiibis fedhii fi danaeettii barnootaa waan qabuuf Itti gaafatamaan mana barumsichaa Beenji Lundhaliin baayyee jaalatama.

Onesmos waggoota shaniif barnoota bu’uuraa wangeelaa sad 1ffaa fi 2ffaa masawwaatti erga xumuree booda Waxabajjii 25 bara 1876 barnoota olaanaatiif gara magaalaa guddittii Suwidiin Istook hoolmiitti ergame.Achittis ogummaa hojii mukaatiin,barsiisummaa fi ogummaa wangeela lallabuutiin waggaa shan barachuu dhaan dippiloomaa isaa fufhatee bara 1881 gara masawwaatti deebi’uun bakka Maankuluu jedhamutti lammii isaa barsiisuu eegale.Maankuuluun Masawwaa irraa kiiloo meetira 10 fagaatti.Onesmos Wangeelaa fi Ogbarruu Afaan Oromoo akkasumas barnoota ammayyaa kannen biroo dheebuu lammiisaa barsiisuu bahuuf jecha bara 1881 karaa Sudaaniitiin Oromiyaa seenuuf Masawwaa irraa ka’ee hiriyoota isaa kan ta’an haadha manasaa,Lubicha Askeel A.pelmaan,Hayiluu fi Filiphoos waliin ji’oota 8 tiif erga miilaan deemanii booda magaalaa Faamaakoo daangaa Oromiyaa gahan. Haa ta’u malee sababa daangaarra lolli turee fi mooticha Sudaan irraa eyyama waan dhabaniif Bitooteessa 1882 of duuba deebi’uuf dirqaman.Onesmos garuu osoo abdii hin kutatin ammas wangeela barsiisuu itti fufe.Hawwii inni oromiyaa seenee lammiisaa barsiisuuf qabu milkaa’uu baatus osoo abdii hin kutatin Afaanii fi Ogbarruu Afaan Oromoo sadarkaa har’aatti tarkaanfachiisuu irraa boodatti hin deebine.

Haaluma kanan bara 1882 kana keessa kitaaba xiqqaa Onnee Namaa/The heart of the man/ jedhu afaan Girikii irraa gara afaan Oromootti hike.Kitaabni kun faaruu 100 qabdi turte.Itti aansuu dhaan kitaaba xiqqaa< Luuter Kaatekizim> jedhu hiikeera.Ituma kanaan jiruu bara 1884 ergamoota Ingiliz kan ta’an mooticha Abisiiniyaa Yohaannis 4^(ffaa) bira dhaquuf ka’anii wajjin deemee ture.

Sababni isaa afaan hiikuun misiyoonota gargaaruu fi Lubicha Luundhaal wajji xalayaa eyyemaa Oromiyaa seenuu mooticha Minilikiif erguuf.Bara 1885 Onesmos misiyoonotaa wajjin yeroo Finfinnee gahu mootichi Minilik gara naannoo isaa demuu waan dhorkeef bara 1886 Maankuuluutti deebi’ee barsiisuu itti fufe.Onesmos yeroo lammaffaatiif yaalii inni oromoiyaa seenee lammii isaa barsiisuuf taasisaa ture erga jalaa dukkana’e booda Oromoota biyyaa bahaanii wajjiin kan durii caalaa Afaan Oromoo guddisuuf karoorfatee oromoota naannoo Asmaraa bakka Galab jedhamu jiraachaa turan keessaa tumsa Asteer Gannootiin Ogbarruu Afaan Oromoo guddisuu,wangeelaa fi barnoota ammayyaa waliin Oromiyaa barsiisuuf guddaa carraaqan.Asteer Gannoo nama bara1870 Godina Iluu Abbaa Booraatti dhalatte.Akka barreeffamin tokko tokko ibsutti ogbarruun Onesmosiin qophaa’aniif hiikaman waggoota kudha shan fixan.Haaluma kanaan bara 1885nitti gargaarsa Asteer Gannootiin Kuusaa jechoota Oromoo kitaaba jechoota 600 qabu qopheesse.Itti aansuu dhaan bara 1886 faruu wangeelaa <Galata Waaqayyoo Guddaa>/Thanks to God / jedhu hiikee maxxansiise.Bara 1893 Kakuu Haaraa Afaan Oromootti hike.Bara 1894 ammoo gargaarsa Asteer Gannootiin kitaaba Sheekkoo gabaabaa 79 qabu mata dureensaa Jalqaba Dubbisaa jedhu fuula 174 fi jechoota 3600 qabu qopheessuun maxxansiiseera.

Kanarraa ka’ee Hiikaan Abbaa Ogbarruu Afaan Oromoo /The Father of Oromo Litrature/moggaasa jedhu argate.Kana malees Onesmos ogummaa kitaaba qulqulluu hiikuu, maxxansiisuu fi gulaaluu gadi fageenyaan barachuu gara biyya Suwizre Laandii magaalaa chiriskoomaa deemee kitaaba qulqulluu gara afaan oromootti hiikurra darbee kanneen afaan oromootti hiikamanii qophaa’an uummata oromoo keessa facaasuu danda’eera.Kana gochuu isaatti galteeffatamuu osoo qabuu hacuuccaa sirna olaantummaa sabaa fi amantaa tokkootiin qabamee akka mana adabaa galu ta’e.Erga hidhaa dhaa bahees bara 1905 afaan oromootiin barsiisuu fi lallabuu seeraan dhorkame.wanti biraa hafee mana isaa keesattillee ijoolleesaa akka hin barsiifne dhorkame.Misiyoononnis Afaan Amaaraa fi Afaan Ingiliziitiin male lallabuu akka hin dandeenye dhorkaman.Ituma kanaan jiruu Onesmos Nasiib lammiisaatiif hojii gurguddoo fi boonsaa ta’e hojjetee Waxabajjii 21 bara 1931Naqamtetti boqote.(Barruu Seenaa Hiikaa Awaajii Waajjira Aadaa fi Tuurizimii Aanaa Hurrumuutiin qophaa’e (2007).

Hawwata Aadaa (Cultural Attractions)`,
  },
];

const CULTURAL_TOPICS = [
  {
    titleOm: `Maalummaa Fuudhaa-Heerumaa`,
    title: `Marriage Customs (Fuudhaa-Heerumaa)`,
    bodyOm: `1.  Maalummaa Fuudhaa-heerumaa

Fuudhaa heerumni/gaa’elli jireenya hawaasummaa dhala namaa keessaa isa tokko ta’ee adeemsa namni tokko bultii ittiin ijaarratu jechuudha. Dhalli namaa uumamaan jireenya hawaasummaan kan walitti hidhamedha. Yaada kanas Warquun akkana jechuun ibsa, “Gaa’elli hariiroo abbaa manummaafi haadha manummaa uumuuf dubartiifi dhiira gidduutti walitti dhufeenya uumamudha,” (Warquu 2001:155). Akka yaadni kun ibsutti hariiroon uumamu kun hariiroo abbaa manummaafi haadha manummaati.

Karaawwan dhalli namaa hawaasummaan walitti hidhaman/walitti dhufan yookiin walfaana ta’an keessaa inni tokkoofi guddaan fuudhaa-heeruma. Kunis akka jalqaba walitti dhufeenya maatiitti ilaalama. Kana jechuun namni tokko maatii hundeeffaachuuf dura fuudhaafi heerumaan eegala; bultii dhaabbata.

Fuudhaa-heerumni kunis adeemsota gara garaa keessa darba. Gosoota gara garaas qaba. Adeemsonni fuudhaa heerumni keessa darban kunniinis gosoota fuudhaa heerumaa irratti hundaa’u.

2.3 Gosoota Fuudhaa-Heerumaa Oromoo

Fuudhaa-heerumni yookiin gaa’elli karaalee garagaraa raawwatama. Akka Warquun (2001) ibsutti gaa’eelli addunyaa kana irratti karaalee sadiin kan raawwatu yoo ta’u, akka seera biyya keenyaatti gaa’elli/fuudhaa heerumni gama amantaa, aadaafi mana qopheesssaatiin akka raawwatuu ni-ibsa.

Fuudhaa-heerumni Oromoo karaa aadaatiin raawwatamus akkaataa raawwiifi adeemsota keessa darbanii raawwataman irratti hundaa’uun bakkawwan gara garaatti qoodama. Haaluma kanaan gosoonni fuudhaa-heeruma Oromoo beekamoon kan qarreefi qeerroon (shamarriifi dargaggeessi) ittiin walfuudhanii bultii ijaarratan shan akka ta’aniifi isaanis, naqata/naqataa, sabbatmarii, aseennaa, itti gala/waliin deemuufi butii akka ta’an Misgaanuun (2011:20) ni ibsa. Waayee tokko tokkoon gosoota fuudhaa heeruma kanneenii hayyoonni gara garaa maal akka jedhanis akka itti aanutti lafa kaa’amaniiru.

1.  Naqata/ Naqataa

Naqatni yookiin naqataan gosa fuudhaa-heeruma aadaa Oromoo keessaa isa tokkodha. Gosti fuudhaa-heerumaa kun Oromoota naannoo adda addaa biratti kan beekamuufi gosoota fuudhaa-heeruma isaan kaan caala bal’naan kan hojiirra ooluufi beekamuudha.. Uummanni Oromoo gocha fuudhaa-heerumaa kana akka kabajaatti ilaala. Keessaayyuu gosa fuudhaa-heerumaa kana akka kabajaafi ulfinaan guutameetti ilaalama.

Akka aadaa Oromootti namni ilma isaa naqataan fuusise yookiin intala isaa naqataan heerumsiise nama guddaa jedhamuun beekama. Kana jechuunis namni kun nama ulfaataa, kan kabaja qabu jechuudha. Hawaasichaa biratti bakka guddaa qaba.

Maatii ijoollee isaa naqataan heerumsiise qofa osoo hintaane, ijoolleen naqataan walfuudhanillee maatiifi hawaasa naannoo isaaniirraa kabaja guddaa argatu; akka ijoollee eebbifamtootaattis ilaalamu. Yaada kanas Misgaanuu (2011:20) akkana jechuun ibsa: “… haala raawwii gaa’ela Oromoo keessatti warroomni yookiin gaa’elli naqataan raawwatu hunda caalaa kabaja qaba.”

Gosti fuudhaafi heerumaa kun Oromoota naannoo gara garaa biratti moggaasota adda addaatiin kan beekamu yoo ta’u, naannoo tokko tokkotti naqata (Misgaanuu), naannolee birootti immoo naqataa (Misgaanuufi Warquu), akkasumas naannoon itti kadhaa (Misgaanuu) jedhamuun beekamullee akka jiran odeeffannoon barreeffamoota dhimma kanarratti barreeffanirraa arganne ni ibsa. Dabalataanis gosti fuudhaa-heerumaa kun ‘gabbara’ jedhamuun bakka itti waamamuullee akka qabu Misgaanuun akkana jechuun ni ibsa, “Yaadni naqata jedhu kun iddoo tokko tokkotti immoo gabbara jedhamuun beekama, ” (Isuma).

Yeroo durii adeemsa fuudhaa-heeruma naqataa yookiin naqataa keessatti intala ilmi isaanii fuudhu kan murteessuu warra yookiin maatii gurbaa fuudhuuti. Gama shamaraatiinis gurbaa intalli isaanii itti heerumtu kan murteessu maatiidhuma intalaati. Maatiin intalaafi kan gurbaa walitti dhufuun adeemsota jiran erga xumuranii booda, gurbaafi intala biraan yaadicha gahu. Yaada kanas Misgaanuun Mabaya wabeeffachuun akkas jechuun ibsa, “Marriage in Oromoo culture is the responsibility of the girls family, rather than being only that of the two individuals,” (Isuma)

Sirnoota Gosa Fuudhaa Heeruma Naqataa Keessatti Raawwataman

Namoonni gaa’ela isaanii naqataan raawwatan sirnoota gara garaaa keessa darbu. Sirnoonni kunneenis kan aadaafi amantaa hawaasichaatiin walqabatanidha. Akka Warquu (2001:157)tti naqatni adeemsota sadii of keessaa qaba. Yaada kanas akkas jechuun ibsa, “…adeemsa kaadhimmachuu/naqachuu keessatti, filachuu (durba ilaallachuu), kadhaa (gaaffii)fi mariin ni raawwatamu, ” (Isuma)

Adeemsonni fuudhaa-heeruma naqataa keessa darbu naannoo tokkoo naannoo biraatti garaagarummaa qabachuu isaa eeruun Misgaanuu (2011:23) naqanni adeemsota armaan gadii akka ofkeessatti qabatu ibsa.

A.  Ilaallata

Ilaallanni adeemsa fuudhaafi heeruma naqataa keessaa isa tokkoo ta’ee isa jalqabaa yoo ta’u, adeemsa maatiin gurbaa intala ilma isaaniif filatan ittiin ilaallatan jechuudha. Kunis haala naannoo irratti hundaa’uun gurbaa fuudhuun yookiin maatii isaatiin ta’uu kan danda’udha. Yaada kanaan walqabsiisuun Warquun akkana jedha, “Akka aadaa Oromootti mirga kadhachuu (ilaallachuu) kan qabuu gurbaa yookiin maatii gurbaati,”. Yaada kanarraa ilaallatni maatii gurbaatiinillee raawwatamuu akka danda’u hubanna.

Dargaggoonni bakka shamarran baay’inaan argaman bakka qoraan cabsaa, gabaa, bakka sirbaa/cidhaafi kkf deemuudhaan shamara isaaniif taatu filatu. Haala kanas Misgaanuun akkana jechuun ibsa, “Aadaa Oromoo keessatti bakka shamarran hedduminaan argamanitti deemuun dargaggeessi durba ilaallachuun kan amaleeffatamedha,” (fuula 23).

Haala kanaan dargaggeessi tokko shamarran arge keessaa kan naaf taati jedhee ilaalee erga filatee booda maatii isaatti himaata. Durba yookiin shamara filate kana wajjinis walitti dhufeenya uumuu yaala. Kana booda maatiin gurbaas karaa itti deemuun danda’amuun adeemsota itti aanan itti fufu.

B.  Qorannoo Sanyii

Intalli erga ilaallatamtee booda, adeemsi itti fufu sanyii intalaa qorachuudha. Adeemsa kana keessattis dhimmoota adda addaatu xiyyeeffatama. Dhimmi guddaan sanyiin qoratamuuf maatiin intala ilaallatamte kanaa kan gurbaa waliin akka walgitu ilaaluufi. Inni biraan immoo, firoomni maatii lamaan gidduu jiraachuufi dhiisuu adda baafachuufi. Yaada kana ilaalchisuunis Misgaanuun (2011:24) akkana jedha, “Erga intaala ilaallatanii booda seenaa ishee, waa’ee maatii isheefi firummaan isaan gidduu jiraachuufi jiraachuu dhiisuu ni qoratu”.

Maatiifi lammiin gurbaa sanyiifi maalummaa intalaa qorachuun erga mari’atanii booda murtoo tokkorra gahu. Yoo sanyiin intalaa kan gurbaa waliin kan walgituufi firoomni gidduu isaanii hinjiru ta’e, ulaagaa guutte jechuudha. Kanaafis adeemsa itti aanu itti fufu.

C.  Kadhata

Adeemsi itti aanu immoo, kadhatadha. Kadhata jechuun gara mana warra intalaa deemuun haala jiruu ibsanii heyyama maatii intalaa gaafachuu jechuudha. Yaada kanas Misgaanuun akkana jechuun ibsa, “… kadhaan adeemsa intala tokko fuudhuuf barbaadanii erga argatanii abbaa ilmaa yookiin wasiilli gara mana warra intalaa dhaquun gaaffii isaanii kan dhiheessanidha,” (Isuma).

Akka yaada kanaatti kadhata jechuun intala ulaagaa guuttee argamte tokko gara maatii ishee deemuun gaa’elaaf gaafachuu jechuudha. Gara warra intalaas deemuun dhimma dhaqaniif erga ibsanii booda, deebii warra intalaa eegu. Warri intalaas murtoo isaanii gaafa isaan beeksisan beellamuun isaan geggeessu. Murtoo isaanii kanas abjuufi milkii ilaallachuun akka murteessan namoota kadhaa dhufan kanaaf ibsu.

Yaada kana ilaalchisee Warquun (2001:158) akkana jedha, “…(maatiin intalaa) ‘firaan mari’annee, faaroo ilaallannee isinii deebisna’ jedhu.” Sana booda abjuufi milkii ilaallachuun guyyaa beellama qabatan kanatti waan murteessan kana ifa godhu.

D.  Milkii (Biqila) Ilaallachuu

Biqila ilaallachuun adeemsa fuudhaa-heeruma naqataa keessaa isa tokko ta’ee, sirna itti milkiin ilaallatamudha. Yaada kana Misgaanuu (2011:25-26), akkana jechuun ibsa, “Akka sirna naqataatti guyyaan sagal biqila ilaallannaaf mana lachuutti yoo hafu garbuu ’samareta’ jedhamu biqilchanii jalqaba mana gurbaatii jaarsoolii, lubni Gadaafi namoonnii ollaa ilaalanii walfaana ‘gaariidha,’ erga jedhanii booda lubichi marga jiidhaa irratti firfirsee bakkatti deebi’ee kaa’ama.” Kunis kan ta’u biqila biqilchuun milkaa’inni (biqila toluun midhaan dhuubame sana) biqilichaa walitti toluu jara (warra fuudhaaf walbarbaadu) lamaanii kan ibsu ta’a.

Faallaa kanaatiin biqilichi kan biqila badu yoo ta’e immoo, milkii badaa yookiin jarri lamaan akka waliif hintaane ibsa. Gama biraatiin, biqilli baduun milkiin baduu ibsa waan ta’eef, biqilli milkii ilaallachuuf biqilchame sun hintolle taanaan gama lamaaniiniyyuu sirni sun hafuu danda’a. Yaada kanas Misgaanuun akkana jechuun ibsa, “… yoo milkiin gama lamaaniinuus ta’ee gama tokkoon gaarii hintaane kadhatus warri intalaas ni dhiisu,” (fuul.25).

E.  Jinfuu Dhaabbata

Jinfuu dhaabbata jechuun akka Misgaanuun ibsutti guyyaa gaafa jalqaba intala kadhachuun itti eegalu jechuudha. Guyyaa kana maatiin gurbaa qe’ee warra intalaa deemuun jinfuu dhaabbatee gala. Guyyaa sanaa qabee intala sana gaafachuuf namni biraan qe’ee sana hindeemu; yoo deemes intalli sun nama dursa jinfuu dhaabbateef akka kennamtu Misgaanuun (fuul. 26) ni ibsa.

F.  Guyyaa Naqataa

Erga maatiin intalaa murtoo isaanii ibsanii warra gurbaatiif barcuma kennaniii adeemsi itti fufu naqataaf beellama qabachuudha. Guyyaan naqataa guyyaa amartiin intalaaf kaa’amudha.

Haalli kunis bakka bakkatti garaagara ta’uu mala. Innis bakka tokko tokkotti intala kaadhimamtuuf amartii mormaa kaa’uun kan raawwatu yoo ta’u, naannoo tokko tokkotti immoo, qubeelaa quba intala naqatamtuutti kaa’uun kan raawwatamudha. “Kunis (naqataan) intalli erga gurbaa fuudhuuf kadhatee kennamtee booda gosti mucaa firoottan isaanii waliin dhaqanii qubeelaa kaa’uufi…” Misgaanuu (2011:26). Yaadni kun intalli heerumtu kan naqatamtu qubeelaadhaan ta’uu isaa quba nama qabsiisa.

G.  Sirna Naqataa

Akka Misgaanuun ibsutti sirni naqataa guyyaa itti warra intalaatiif kennaan itti kennamudha. Haalli kunis kaadhimachuutti aanee akka raawwatu Misgaanuun ni ibsa. Maatiin intalaa wantoota isa barbaachisu kan inni maatii gurbaa gaafatu sirna kanarratti jechuudha.

H.  Guyyaa Cidhaa

Guyyaan kun guyyaa adeemsonni gurguddaan fuudhaa heerumaa xumuramanii namoonni walfuudhan lamaan mana tokkotti walfudhatanidha. Guyyaa kanas cidhaan walqabatee sirnoota garagaraatu raawwatama. Sirnoota kana keessaas kan mana warraa gurbaatti raawwataniifi kanneen mana warra intalaatti raawwataman ni jiru. “Guyyaan cidhaa guyyaa gaafa mana warra intalaafi warra gurbaattis sirnoonni adda addaa kanneen akka nyaataafi dhugaatii qophaa’uun raawwatamuudha,” (Misgaanuu 2011:26).

I.  Sirna Horii Fudhannaa

Gaafa cidhaa maatiin intalaa horiifi meeshaalee garagaraa (meeshaalee mana keessaa) mucayyoo heerumtuuf akka naannoo isaatti ni kennu. Yaada kanas Misgaanuun akkana jechuun ibsa, “Sirni kun (sirni horii fudhannaa) akka aadaa saba Oromootti kennaa intalaa kennamu kanneen akka horii yookiin loon baay’ee, meeshaa mana keessaafi kan kana fakkaatanidha.” Kennaawwan kunneenis kan abbaan, wasiilliifi firoottan intalaa intalaaf kennan akka ta’e Misgaanuun ni-ibsa.

Maqaan, gostiifi hangi kennaa kanaa naannoodha gara naannootti adda adda ta’uu mala. Haaluma kanaan naannoo Arsiitti loon intalaaf kennamtu ‘eegawoo’ akka jedhamuu Misgaanuun ni-ibsa.

J.  Eebbaa Gaafa Cidhaa Ganamaa

Gaafa cidhaa ganama maatiifi lammiin gurbaa eebbisanii ilmaa isaanii gara mana warra intalaatti geggeessu. Akkasumas maatiin intalaas lammiiwwan waliin ta’uun intala isaanii ni’eebbisu.

Yeroo eebbisan kanas hunduu gama gama isaaniitiin meeshaaleefi wantoota adda addaa harkatti qabatan ni qabu. Akka Misgaanuun ibsutti aadaa fuudhaa heeruma Oromoo Arsii keessatti haadha gurbaatu gurbaa eebbisuun gaggeessa. Yeroo eebbistu kanattis haati gurba fuudhuu “loyi, ofkali!” jechuun dhadhaa dibuun erga eebbiftee booda farda inni yaabbatee deemus dhadhaa dibdi.

Akkasumas eebbi gaa’elaa yoomessa sadii keessatti akka gaggeeffamu Misgaanuun (2011:64) kan ibsu yoo ta’u isaanis, inni duraa yeroo gurbaan fuudhu manaa ba’udha. Inni lammataa immoo, yeroo warri intalaa mucayyittii kennan diinqa (gola) haadhaafi abbaa ishee keessatti kan ta’udha. Kunis kan ta’u warri intalaa, intala isaanii guutuu qabachiisuun marga gudeeda ishee lamaanirra kaa’anii walfaana ta’uun ebbisuu.

Inni sadaffaa immoo, diinqa haadhaafi abbaa gurbaa fuudhuutti yeroo misirroon lamaan qe’ee warra gurbaa ga’an kan ta’u yoo ta’u, misirroota lamaan walbira kaa’uun margaafi biqila gudeeda isaaniirra kaa’uun aannaniifi booka ittii biifanii eebbisu.

K.  Sirna Rakoo Qaluu

Sirni kun sirna gaafa cidhaa galgala raawwatudha. Kunis kan raawwatamu misirroowwan lamaaniin yoo ta’u, innis adeemsa mataa isaa eeggatee kan ta’udha.

Adeemsi kun sa’a dullacha qaluun kan raawwatu yoo ta’u, kunis intalaan “Akka sa’a kanaa hori; buli!” hiika jedhu qaba. Yaada kanas Misgaanuun akkana jechuun ibsa, “Rakoo qaluun galgala intala fuudhanii galan sana kan raawwatudha. Yeroo kana sa’a coomee ilkaan mure fidanii qalu. Sababni isaa akka sa’a kanaa turi, hori, buli jedhanii eebbisu,” (fuula 28).

L.  Sirna Dhoofsisaa

Dhoofsisa jechuun akka aadaa Oromoo Arsiitti intala gurbaan fuudheef horii kennuu akka ta’e Migaanuun ni-ibsa. Sirni kunis kan raawwatu intala fuudhanii galanii bariituu isaati. Horii kanas kan kennu warra yookiin maatii gurbaa akka ta’e Misgaanuun niibsa.

1.  Sabbatmarii/Olnaqii

Gosti fuudhaa-heerumaa kun fedhii intalaafi maatii ishee ala kan raawwatamuudha. Kunis warri gurbaa intala ilma keenyaaf taati jedhan erga filatanii yookiin gurbaan intala naaf taati jedhee filachuun booda warra isaatti himuudhaan, maatiin gurbaa heeyyama warra intalaa osoo hingaafatiin dhaqanii marga buufachuun kan ta’udha.

Gosti fuudhaa heerumaa kun kan filatamu, yoo maatiin intalaafi kan gurbaa sababoota gara garaa kan walhinginne ta’edha. Maatiin gosaan, sadarkaa jireenyaatiiniifi qabeenyaan walgituu dhiisuu danda’a. Yeroo kanas warri gurbaa shakkii warri kun intala nuuf hinkennu jedhurraa ka’uun humnaan karaa kanaan maatii kanatti dhaqa. Gama biraatiin immoo, maatiin karaa kaadhimaannaatiin walii galanii, yoo maatiin intalaa guyyaa fuudhaa jalaa dheeressaniifi, warri gurbaammoo yeroon cidhaa akka gabaabbatu barbaadan karaa kana filatu. Yaada kana ilaalchisee Misgaanuu (2001:30) akkana jedha,

  Kaayyoon gaa’ela sabbatmarii lama. Inni duraa, maatiin lamaan seera naqataatiin cidha raawwachuuf erga walii galanii booda, guyyaan gaa’elaa/cidhaa sun fagaatee mul’achuu danda’a. Warri gurbaa ammoo, dafanii fuudhuu barbaadu yoo ta’e, qophii cidhaaf barbaachisu hunda dhoksaatiin guuttatanii, maanguddootaafi dargaggoota dhiiraa fudhatanii halkaniin qe’ee warra intalaa deemu. Dukkana sanaan suuta jedhanii balbala jaraa bira baala ulmaayiifi alangaa kaa’anii hammma bari’utti naannoo manaa taa’anii eegu.

  Ganama yeroo maatiin intalaa mana banatan, ”Aaga baasi! Ilmi aagaa diida/ala jira; intalli aagaa mana jirti. Ilma keenya abaluuf, intala keessan abaluu kennaa…” jechaa kadhaafi gaaffii itti fufu. Diduun intala sanarratti balaa fida jedhamee waan yaadamuuf, darbee darbee malee hindidamu. Kanaafis namoota qaamni isaanii hir’uu, duudaa, jaamaa, dinkii fudhatanii deemu.

  Inni lammataa warri lamaan kana dura walii galtee kamiyyuu otoo hinqabaatiin gaaffii dhiyaatuudh. Ka’umsi sabbatmarii inni kun immoo, intala warri gurbaa ilma isaaniif yaadan namni biraan gaafachuuf jiraachuun yoo dhagahame yookiin immoo, yoo sababoota gara garaa warri intalaa nuuf kennuu diduu danda’u jedhanii shakkan sabbatmariin dhaqama. Misgaanuu (2011)

Gaafa sabbatmarii kana maatiin/abbaan gurbaa jaarsolii lammii ta’an kadhachuun qabatee barraaqa gara qe’ee warra intalaa dhaquun marga balbalarra buufatanii intala isaanii akka kennaniif kadhatu. Yeroo kanas warri intalaa hinkenninu jechuudhaan falmiin yeroo dheeraa gidduu isaaniitti erga ta’ee booda jaarsoliin olla bitaa mirgaafi lammii intalaa ta’an gidduu galuun araara buusu.

Araarri bu’u kunis maatiin intalaa dubbii dhiisee akka intala isaanii akka kennaniifi marga dhufee deebisuu akka hinqabne jaarsoliin biyyaa safuu waliin walqqabsiisuun kadhatu.

2.  Aseennaa

Aseennaan gosa fuudhaa heeruma dura walii galtee intalaafi gurbaa irraa eegaludha. Dura gurbaa intala naaf taati jedhe gabaatti, bakka sirbaatti yookiin bakka qoraan cabsaatti argee erga filatee boodaa karaa hiriyyaa yookiin fira intala kanaa dhimma isaa ittiin gahata. Kana booda isheenis deebii ishee yeroo muraasaan booda laattiif. Kanumaan adeemsichi itti fufa.

3.  Itti Gala

Ittigala jechuun akkuma maqaan isaa ibsutti walitti galuu jechuu yoo ta’u, adeemsa kana keessatti intalli mana warra gurbaa deemuudhaan gurbaatti kan galtu jechuudha. Haalli kunis seera mataa isaa qaba. Seerri kunis hawaasa naannoo tokkoorraa gara biraatti garaa garummaa qabaachuu mala.

4.  Butii

Butiin gosa fuudhaa-heeruma fedha intala hineegneefi kan humnaan intalarratti raawwatamudha. Gosti fuudhaa-heerumaa kun sababa garagaraa ka’umsa godhachuun kan humnaan fedhii intalaafi maatii intalaatiinillee ala raawwatudha. Adeemsa butii kana keessatti badiiwwan hedduutu namootaafi qabeenyarra gahuu danda’a.

4.  Aadaa Fuudhaa-heeruma Oromoo

Yeroo gara garaa keessa aadaa fuudhaafi heeruma Oromoo naannoo adda addaarratti qorannoon taasifameera. Qorannoon kunis kan hayyoota Oromoo bakka adda addaatiin taasifaman yoo ta’an, xiyyeeffannoon isaaniis gama garagaraatiin addaddummaa qabaachuu ni mala.

Qorannoowwan aadaa fuudhaafi heeruma Oromoorratti taasifaman keessaa tokko kan Misgaanuu Gulummaatiin (2011) taasifamedha. Qorannoon kun gosoota fuudhaa heerumaa aadaa Oromoo kan xiyyeeffatu yoo t’u, kallattumaan hawaasa kan bu’uureffata osoo hintaane, kitaaba barreessuuf akka tolutti qindaa’ee bifa kitaabaatiin kan taa’edha.

Qorannoo biroon fuudhaa heerumaa aadaa Oromoorratti hojjetame Warquu (2001) yoo ta’u qorannoon kunis sirna fuudhaa heeruma qaalluu Oromoo Gujii kan xiyyeeffachuun guutiinsa Digrii Lammaffaatiif kan hojjetamedha. Qorannoo kana keessatti irra guddaan kan kan xiyyeeffatame moggaasa qaalluu yoo ta’u, kanumaan walqabsiisuun hiikni walii gala gosa fuudhaa heeruma kanaafi adeemsonni isaa akka naannoo sanaatti (akka Gujiitti) wayi ibsee jira.

Inni biroon qorannoo waajjira aadaafi tuuriizimii godinichaatiin hojjetame yoo ta’u, qorannoon kun kan hinmaxxanfamnefi waajjirichuma keessatti qofa argamudha. Qorannoon kunis gosoota fuudhaa heeruma aaddaa Oromoo naannoo kanaa kan xiyyeffatee hojjetame ta’uyyuu, gadi fageenyaan tokko tokkoon gosoota kanneenii gadi fageenyaan adeemsota isaanii dabalatee kan ibsu miti.

Qorannoon “Qaaccessa adeemsota sirna fuudhaa fi heeruma naqataa Godina Iluu Abbaa Booraa” jedhu kunis adeemsota fuudhaa fi heeruma naqataa keessatti rawwatu qaacceessuu kan xiyyeeffatu yoo ta’u, odeeffannoo hawaasa naannochaarraa argaterratti hundaa’uun dhimma kana qaaccesseera. Kanas kan taasise daayyeessota caasaa, xinwaasaa, walsimataa fi daayeessa tajaajilaa bu’uura taasifachuunidha.

Daayeessoonni kunneenis gama adda addaatiin qorannoo kanaaf bu’uura ta’aniiru. Qorannoo afoolaa tokkoof daayeessi ka’umsa akka ta’e hayyoonni adda addaa ni ibsu. Kanuma bu’uura godhachuun qorannoon kunis daayeessoota armaan olii ka’umsa taasifachuun dhimma qoratamu kana gama caasaa, hawaasummaafi walitti dhufeenya hawaasaa keessatti tajaajila inni qabu ilaaluun yaalamee jira.`,
  },
  {
    titleOm: `Gumaa`,
    title: `Gumaa — Reconciliation System`,
    bodyOm: `GUMAA

Ummannii Oromoo sirna Ittiin bulmaata mataa isaa qaba.Akka ittiin bulmaata isaanitti jaarsoliin biyyaa heera heeruudhaan ummata isaan hogganu.Heeroota isaanii keessaa Gumaan isa tokko dha.

Gumaan kan namnii ittii fayyadamuu keessaa isa tokko ta’ee,Jaarsoliin ykn Maanguddoonnii biyya heera hordofuun kan wal lolee walittii araarsuun kan wal ajeesee walittii fiduun akka ittiin bulmaata aadaatti marii firrii irraa ajeefameef gumaa baasuun walittii fayyisuu dha. Sababnii Gumaan kunii ba’uufis namootnii walajeesan kunniin Haaloo akka wal hin baanee ykn loollii jidduu isaanitti akka hin deebineef .

Akkaataan gumaa kanaas itti baasan adeemsa mataa isaa qaba. Namootnii lamaan wal dhabanii wal ajeesan kun iin namoota walirraa dhalatanii ykn gosa tokko kan qabanii dha.Kanaaf akka aadaa keenyaattii ykn aadaa Oromoottii immoo yeroo gumaa baasan kan haala mijeessuu Warra Gosa lamaanii dha jedhu.

Abbootiin ragaa keenya akka ragaa nuuf bahanittii seenaa waliin jireenya Oromoo fi saboota Ollaa gidduuttii muul’atu keessattii gumaan eddo olaanaa qaba.Gumaan sirna gareen lubbuu dabarsee fi warrii lubbuun jalaa darbite kan ittiin araaramanii dha. Warrii lubbuu dabarsan murtee Jaarsoliin seera gumaa kanarraatti hundaa’uun murteessan kaffalu. Gatiin kennamuu lubbuu bahee bakka bu’a jechuuf otoo hin ta’in,Gumaan haala namnii cubbuu hojjate ittiin ofirraa dhiqun firooma deebisatu jedhamee waan fudhatamuuf,kanaaf murteen darbuu seera gumaa irrattii hundaa’aa seerichis nama beekaa ykn dogoggoree ajeese,nama ballessaa ofii amanee fi hin amannee jedhee addaan baafata.

Namoonnii ajjechaa raawwatanis qabeenya ofii qofa walittii qabanii akka kaffalan hin murtaa’uu.fkn murtee kennaman keessaa namni nama ajeesee sibiila harkattkii qabaachuun tokko tokkoo gosaa tokko tokkoo lammii isaa fi biyya ormaarra deemee badii hojjate erga himee booda gargaarsa argatu walittii guuree kaffala.

Gumaa jechuun yeroo booda guddatee qabiyyee guddaa fi siyaasa haa qabaatu malee,Foon horii gosoota namnii jalaa du’ee fi warra ajeeseef xixiqqatee guyyaa araaraa nyaataaf hiramu ykn kennamuu dha.Foon qoodamus waan xiqqoo ta’eef Gumaa nyaannee jedhama.Gumaan yeroo ammaa hawaasa keessattii kan beekkamu sirna gatii lubbuu ittiin baasan ykn sirna araaraa ittiin gaggeessaniidha.

Sirna gadaa keessattii raawwii Hawaasummaa fi siyaasaa sirrittii addaan baasanii himuun ulfaataa dha.kanaaf raawwii gumaa keessattii adeemsa bulchiinsa waan ta’eef dhimma Hawaasummaa bal’inaan haa qabaatu malee,Siyaasummaa akka of keessattii qabu waan shakkisiisu mitii.Sirni kunii haala warrii diina ta’e ittiin deebi’anii fira ta’anii dha. Gumaan sirna namoonnii dhuunfaanis ta’e gosaan wal ajeesan irrattii walittii araaramanii fi walii galanii dha.Seerrii gumaa akkaataa gumaa dabartee ittii gaafatu qaba.Kunis bifa lamaanii dha.Isaanis beekaa kana ajeesee fi tasa kana ajeese jedhamee gargar baha.

Adeemsii araara otuu hin raawwatin garuu akkuma ajeechaan raawwateen namnii lubbuu dabarsee fi maatiin isaa ganda ykn Zoonii keessa jiran qaxxaamuranii ykn fagaatanii baqatuu. Lageen kun baay’ee cee’anii,tulluu sagal qaxxaamuranii ykn fagaatanii baqatu.Laggeen kunii yoo baay’ee walirraa kan fagaatan ta’e laguma lamaan tokko deddeebi’anii akka ce’an taasifamu.Gochaan fagaatanii deemuu kan ibsu ulfina lubbuuf qaban haala ittiin ibsan yoo ta’u,namnii lubbuu namaa dabarsee hanga gumaan bahuttii mana ofii taa’uu hin danda’u.Adeemsa gumaa baasuu keessatti akkuma gubbaatti ibsamuuf yaalame gumaa baasuun namoonnii lama balaa tasaatiin yoo wal ajjeesan kan raawwatamuu dha.

Akka seera Oromoo ganamaattii,Oromoon tokko yoo tasa ta’e malee beekaa Oromoo kan biraa hin ajjeesu kunii kaka Oromooti.Kana jechuun Oromoon walittii hin bu’an,wal hin lolan jechuu miti,Garuu Oromooni otuu tas waraana harkattii qabatanii otuu jiran namaan walittii bu’anii waraana irraa garagalchanii wal rukutu malee,ittiin wal waraanuun safuutu dhoorkaa ture.kan ta’u malee sababa walirraa fageenyaan wal loluun kakuu Oromoo ganamaa irraanfachuun yoo ajjechaan raawwate,Walittii bu’iinsa kana karaa gumaa baasuun aadaa tureedha.Akka seera kaka Oromoo keessaa tokko ammo seera dubartii ajjeesuu safuun dhoorkaa taasisuu dha.Yoo tasa ta’e garuu Gumaa baasuu qofa malee ni falata. Akka Maanguddoonnii kaasanittii dur Oromoon duula irrattii dubartii fi Daa’iman ni booji’u malee hin ajjeesan.Dubartii kan ajeese akka dhiiraattii hin lakkaa’amu.Sababni isaas Cubbuun Lubbuu dubartii kan dhiiraa caala jedhamee waan amanama.

Nama Lubbuu dabarseettii murtiiwwan adabbii cimaa irrattii murteeffama namnii lubbuu dabarsee tokkoo adabbii fi jecha waan gumaa kaffaluu horii qabaatuu illee akka qabeenyasaa hin kaffallee taasiisuun akka gostii fi maatiin isaa kadhate kaffaluu taasifama.Sababa kanaaf Abbaan isaa biyyaa keessaa deemee ykn daandii guddaarrattii cancala (sansalata) harkattii qabate “lubbuun nu harkattiidarbitee,gumaa baasuuf kadhadha lammii koo na gargaaraa,na ofkolchaa jedhee kadhata.Yeroo sirnii gumaa gaggeessan wantoota gumaa sanaaf barbaachisan erga qopheeffatanii booda ykn seerrii gumaa akka raawwatu taasiisuu.Sirnii gumaa kana keessattii wantoota barbaachisan nyaataa fi dhugaatii gosa adda addaa,Hoolaa ishee gurraattii,Hiddii 100,Ashaboo Amoolee 5,qarshii saantimiidhaan (Callaa) hamma murtaa’ee tokko,fi k.k.f qopheessuudhaan.Jaarsolii Gandicha keessattii beekkamoo ta’an kanniin waa’ee gumaa baasuu filachuun,akka seerrii gumaa kunii ittii raawwatamu warra wal dhabee lamaan laga gama fi gamana dhabbachuun seera gumaa kana akka raawwatamaniif Jaarsii biyyaa haala mijeessa.

Guyyaa gumaan ittii raawwatamu guyyaa Caginoo osoo hin ta’in guyyaa qulqulluu akka ta’ee jaarsoliin umuriin ragaan kanneen madda ragaa keenya ta’an dhugaa nuuf bahu.

Adeemsa kana erga raawwatee, Jaarsii filatamee namoota walittii araaramuuf dhufan sana lamaan laga gamaa fi gamana dhaabbatan sanaaf margaa jiidhaa coqorsa jedhamuu harka harkattii kennuun seera gumaa akka raawwataniif ebbaan jalqabanii namoota wal dhabee akka araaraman taasiisuu.egaa,wantootnii qophaa’an hundinuu ga’ee mata mataa isaanii qabu:- fkn Hoolaan namoota wal dhabe lamaan gidduuttii akka qalamtee bishaan sanattii gatuun akka lammaffaa wal hin barbaanneef harka walqabatu,Ashaboo Amooleenis akkaatuma sanaan yoo wal barbannee ykn wal lolle akka amoolee kana nuu haa mameessuu jechuun akka araaraman ta’ee saantima qophaa’ee sana nyaataa fi dhugaatii qophaa’ee sana nyaatanii,dhuganii nagaa buusanii sirni gumaa bahe booda yeroo gara mana deemanii immoo saantima qophaa’ee kadhattuuf raabsuun sirni gumaa baasuu akka aadaa oromootti Jaarsii biyyaa raawwachiisa jechuu dha.

[C:\\Users\\Administrator\\Desktop\\photo_2026-07-16_10-44-48.jpg]

Irreecha Malkaa Soor`,
  },
];

const HISTORY_ENTRY = {
  title: `History of Illubabor Zone`,
  body: `Ilu Ababor Zone was a province in the south western part of Ethiopia. The name Ilu Ababor was come from two Oromo words “Ilu” and “Ababor”. Ilu is a name of a clan and Ababor was horse name of Chali Shone, the one who founded the ruling family of the area when it conquered by Shewa, hence Ilu Ababor means the Ilu belonging to Ababor. Ilu Ababor was an independent Oromo state that was conquered and occupied by the forces of emperor Minilik II in 1881. The last king of Ilu Ababor was Fatansa Ilu. The Shewan forces led by Tessema Nadew broke Fatansa’s main force and camped at a place called Karsa Gogila near modern day Mettu. However, Fatansa had surrounded the camp to make a bloody battle Fatansa’s forces were overwhelmed by the firepower of Ras Tessema. Fatansa’s was captured and imprisoned at Barroi, about thirty five kilometers from Mettu. Ras Tessema made Gore the seat of his administration. It was at this time that the semi-feudal system of Naftagnas, Balabats and gebbars was introduced to Ilu Ababor. The importance of Gore as a center for invaluable export trade items in Ilu Ababor depended upon smaller markets such as Hurumu, Nopa, Mettu and Bure. By 1930, each of these markets had a population of about 500 including resident and foreign merchants.

Important trade items to Ilu Ababor were textiles, liquors, sacks, salt, soap, machinery, glass bottles, clothes and others. Exported trade items including coffee and etc., after different governors were administered, the province Italian invaders proclaimed that all the land in the area belonged to the Italian government but allowed Gabbers to use the land under barter terms. Originally, its capital city was Gore. Then around 1970 Etc, the capital moved to Mettu and the border of the province includes Gambela and southern nation (Masha). With the adoption of the constitution in 1995, the territory of Ilu Ababor divided between the Gambela, and southern west Peoples of Ethiopia. The zone has 13 woreda and 1 town with total area 10,920km² and 600 KM far from Capital city of Addis Ababa (Finfine).`,
};

async function main() {
  const zone = await prisma.zone.upsert({
    where: { name: 'Illubabor' },
    update: {},
    create: {
      name: 'Illubabor',
      nameOm: 'Illuu Abbaa Booraa',
      capital: 'Metu',
      region: 'Oromia',
      population: 2271609, // 2007 census
      areaKm2: 15135.33,
      description:
        'Illubabor Zone is a forested, coffee-producing zone in the Oromia Region of Ethiopia, home to the Sor River and Sor Falls near its capital, Metu.',
    },
  });

  for (const w of WOREDAS) {
    await prisma.woreda.upsert({
      where: { slug: w.name.toLowerCase().replace(/\s+/g, '-') },
      update: {},
      create: {
        name: w.name,
        slug: w.name.toLowerCase().replace(/\s+/g, '-'),
        isTown: w.isTown ?? false,
        zoneId: zone.id,
      },
    });
  }

  for (const d of DEPARTMENTS) {
    await prisma.department.upsert({
      where: { slug: d.slug },
      update: {},
      create: {
        name: d.name,
        slug: d.slug,
        zoneId: zone.id,
      },
    });
  }

  const hashedPassword = await bcrypt.hash('ChangeMe123!', 10);
  await prisma.user.upsert({
    where: { email: '[email protected]' },
    update: {},
    create: {
      email: '[email protected]',
      password: hashedPassword,
      fullName: 'Zone Super Admin',
      role: Role.SUPER_ADMIN,
    },
  });
for (const [i, site] of HISTORICAL_SITES.entries()) {
    await prisma.contentEntry.create({
      data: { type: 'HISTORICAL_SITE', title: site.title, titleOm: site.titleOm, body: site.bodyOm, bodyOm: site.bodyOm, order: i, zoneId: zone.id },
    });
  }
  for (const [i, topic] of CULTURAL_TOPICS.entries()) {
    await prisma.contentEntry.create({
      data: { type: 'CULTURAL_TOPIC', title: topic.title, titleOm: topic.titleOm, body: topic.bodyOm, bodyOm: topic.bodyOm, order: i, zoneId: zone.id },
    });
  }
  await prisma.contentEntry.create({
    data: { type: 'HISTORY', title: HISTORY_ENTRY.title, body: HISTORY_ENTRY.body, order: 0, zoneId: zone.id },
  });
  console.log('Seed complete: 1 zone, 13 woredas, 8 departments, 1 super admin.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
