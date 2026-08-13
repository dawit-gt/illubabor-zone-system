'use client';

import { useState } from 'react';
import { useLanguage } from '@/lib/language-provider';
import { selectByLanguage } from '@/lib/i18n';
import { useZone } from '@/hooks/useZone';
import { useSiteConfig } from '@/hooks/useSiteConfig';
import { useContent, ContentEntry } from '@/hooks/useContent';

type Lang = 'om' | 'am' | 'en';
type TabKey = 'history' | 'geography' | 'places' | 'culture';

const TABS: { key: TabKey; label: Record<Lang, string> }[] = [
  { key: 'history', label: { om: 'Seenaa', am: 'ታሪክ', en: 'History' } },
  { key: 'geography', label: { om: 'Teessuma Lafaa', am: 'መልክዓ ምድር', en: 'Geography & Location' } },
  { key: 'places', label: { om: 'Bakkeewwan Seenaa', am: 'ታሪካዊ ቦታዎች', en: 'Historical Places' } },
  { key: 'culture', label: { om: 'Aadaa', am: 'ባህል', en: 'Cultural Attractions' } },
];

/* ------------------------------------------------------------------ */
/* HISTORY                                                             */
/* ------------------------------------------------------------------ */

const HISTORY_TEXT: Record<Lang, string> = {
  en: `Ilu Ababor Zone was a province in the south-western part of Ethiopia. The name Ilu Ababor came from two Oromo words, "Ilu" and "Ababor." Ilu is the name of a clan, while Ababor was the name of the horse of Chali Shone, the person who founded the ruling family of the area when it was conquered by Shewa. Therefore, Ilu Ababor means "the Ilu belonging to Ababor." Ilu Ababor was an independent Oromo state that was conquered and occupied by the forces of Emperor Menelik II in 1881. The last king of Ilu Ababor was Fatansa Ilu.

The Shewan forces led by Tessema Nadew defeated Fatansa's main force and camped at a place called Karsa Gogila near present-day Mettu. However, Fatansa surrounded the camp in an attempt to make the battle bloody. Fatansa's forces were overwhelmed by the firepower of Ras Tessema. Fatansa was captured and imprisoned at Barroi, about 35 kilometers from Mettu. Ras Tessema made Gore the seat of his administration.

It was at this time that the semi-feudal system of Naftagnas, Balabats and Gebbars was introduced into Ilu Ababor. Gore became important as a center for valuable export trade items. Its trade depended on smaller markets such as Hurumu, Nopa, Mettu and Bure. By 1930, each of these markets had a population of about 500, including resident and foreign merchants.

Important trade items in Ilu Ababor included textiles, liquor, sacks, salt, soap, machinery, glass bottles, clothes and others. Export items included coffee and other products. After different governors administered the province, the Italian invaders proclaimed that all land in the area belonged to the Italian government, while allowing Gebbars to use the land under barter arrangements.

Originally, the capital city was Gore. Around 1970, the capital was moved to Mettu, and the province's boundaries included Gambela and the Southern Nations area (Masha). With the adoption of the 1995 Constitution, the territory of Ilu Ababor was divided between Gambela and the South-Western Peoples of Ethiopia. The zone has 13 woredas and one town, with a total area of 10,920 km², and is about 600 km from Addis Ababa (Finfine), the capital city.`,
  om: "Godinni Iluu Abbaa Booraa kutaa lixa kibbaa Itoophiyaa keessatti argamu ture. Maqaan Iluu Abbaa Booraa jechoota Afaan Oromoo lama, \"Iluu\" fi \"Abbaa Booraa\" irraa maddate — Iluu maqaa gosaa yoo ta'u, Abbaa Booraa immoo maqaa fardaa Calii Shonee, nama bulchiinsa naannichaa hundeesse Shawaan yeroo qabamettidha. Iluu Abbaa Booraan mootummaa Oromoo bilisaa ture kan Ceesar Minilik II bara 1881tti qabate. Mootiin isaa dhumaa Fatansaa Iluu ture. Loltoonni Shawaa kan Raas Tasammaa Naadaw durfaman humna waraana Fatansaa jalaa caccabsanii bakka Qarsaa Googilaa jedhamu, Mattuu ammaa cinaatti, qubatan; humnoonni Fatansaa qubata sana marsan, garuu humna waraana Raas Tasammaatiin injifataman, Fatansaanis qabamee mana hidhaa Barroo, gara kiiloomeetira 35 Mattuu irraa fageenyaan jiru keessatti hidhame. Raas Tasammaan Goree bakka bulchiinsa isaa taasise, sirna Naftanyaa-Balaabat-Gabbaar illee dhaabe. Goreen daldala alaa keessatti giddugala guddaa taatee guddatte — bunni keessaa isa tokko — gabaawwan xixiqqoo Hurumuu, Noophaa, Mattuu fi Buree waliin, tokkoon tokkoon isaanii bara 1930tti ummata gara 500 qabu turan. Magaalaan guddittii godinichaa Goree irraa gara Mattuutti kan jijjiirame bara 1970 A.L.H. ti. Heera Itoophiyaa bara 1995tti fudhatameen, lafti godina durii kanaa gargar ba'ee, gariin isaa gara Naannoo Gaambeellaa fi Naannoo Kibbaatti dabalame. Har'a godinichi aanaalee 13 fi magaalaa tokko of keessaa qaba, bal'inni isaas 10,920 km² yoo ta'u, Finfinnee irraa gara Kiiloomeetira 600 fagaata.",
  am: "የኢሉ አባቦር ዞን በደቡብ ምዕራብ ኢትዮጵያ የሚገኝ ግዛት ነበር። ስሙ ከሁለት የኦሮሚኛ ቃላት «ኢሉ» እና «አባቦር» የመጣ ሲሆን፣ ኢሉ የጎሳ ስም ሲሆን አባቦር ደግሞ አካባቢውን በገዛው የቻሊ ሾኔ ፈረስ ስም ነው። ኢሉ አባቦር በ1881 በአጼ ምኒልክ ኃይሎች የተያዘ ራሱን የቻለ የኦሮሞ መንግስት ነበር። የመጨረሻው ንጉሱ ፈጠንሳ ኢሉ ነበር። በራስ ተሰማ ነዋይ የሚመሩት የሸዋ ኃይሎች የፈጠንሳን ዋና ኃይል ሰብረው በአሁኗ መቱ አቅራቢያ ቃርሳ ጎግላ በሚባል ቦታ ሰፈሩ፤ የፈጠንሳ ኃይሎች ካምፑን ከበቡ ቢሆንም በራስ ተሰማ የጦር ኃይል ተሸነፉ፣ ፈጠንሳም ተይዞ ከመቱ 35 ኪሎ ሜትር ርቀት ላይ በምትገኘው ባሮ እስር ቤት ታሰረ። ራስ ተሰማ ጎሬን የአስተዳደር ማዕከሉ አደረገ፣ የነፍጠኛ-ባላባት-ገባር ስርዓትንም አስተዋወቀ። ጎሬ ለቡና ጨምሮ ለወጪ ንግድ ማዕከል ሆና አደገች፣ ከሁሩሙ፣ ኖጳ፣ መቱ እና ቡሬ አነስተኛ ገበያዎች ጋር፣ እያንዳንዳቸው በ1930 ገደማ 500 የሚጠጋ ህዝብ ነበራቸው። የግዛቱ ዋና ከተማ ከጎሬ ወደ መቱ የተዛወረው በ1970 ዓ.ም. ገደማ ነው። እ.ኤ.አ. በ1995 ህገ መንግስት፣ የቀድሞው ግዛት ግዛት ተከፋፍሎ የተወሰነው ወደ ጋምቤላ እና ደቡብ ክልሎች ተካቷል። ዛሬ ዞኑ 13 ወረዳዎችን እና 1 የከተማ አስተዳደርን ያካትታል፣ ስፋቱም 10,920 ካሬ ኪሎ ሜትር ሲሆን ከአዲስ አበባ 600 ኪሎ ሜትር ያህል ይርቃል።",
};

/* ------------------------------------------------------------------ */
/* GEOGRAPHY                                                           */
/* ------------------------------------------------------------------ */

const GEOGRAPHY_TEXT: Record<Lang, string> = {
  en: `Climate and Physical Setting of the Zone

Highland: 10%
Midland: 67%
Lowland: 23%

In terms of rainfall, the zone receives rain for about 7 to 9 months of the year, with annual rainfall of 1,150–2,200 mm. The average/minimum temperature is 18°C, while the maximum temperature is 24°C.`,
  om: "Teessumni lafaa godinichaa Baddaa (%10), Badda-daree (%67), fi Gammoojjii (%23) jedhamee gargar qoodama. Roobni waggaa keessaa ji'oota 7 hanga 9 kan argamu yoo ta'u, hamma isaas 1,150mm hanga 2,200mm gidduutti argama. Ho'ini gidduu galeessaa gadi aanaan 18°C, kan ol'aanaan immoo 24°C. Olka'iinsi lafa godinichaa gara 500m hanga 2,575m gidduutti argama. Godinichi Finfinnee irraa gara km 600 fagaata.",
  am: "የዞኑ መልክዓ ምድር ደጋ (Baddaa, 10%)፣ ወይናደጋ (Baddadaree, 67%)፣ እና ቆላ (Gammoojjii, 23%) ተብሎ ይከፈላል። ዝናብ በዓመቱ ውስጥ ከ7-9 ወራት ይዘንባል፣ መጠኑም ከ1,150ሚሜ እስከ 2,200ሚሜ ይደርሳል። አማካይ የሙቀት መጠን ከ18°ሴ እስከ 24°ሴ ይደርሳል። የዞኑ ከፍታ ከ500 ሜትር እስከ 2,575 ሜትር ከባህር ጠለል በላይ ይደርሳል። ዞኑ ከአዲስ አበባ 600 ኪሎ ሜትር ያህል ይርቃል።",
};

// Embedded OpenStreetMap centered roughly on Mettu / Illubabor Zone.
const MAP_BBOX = '35.20%2C7.95%2C35.95%2C8.60';
const MAP_MARKER = '8.3500%2C35.5800'; // Mettu, Illubabor Zone

/* ------------------------------------------------------------------ */
/* ENGLISH TRANSLATIONS FOR HISTORICAL PLACES / CULTURAL ATTRACTIONS   */
/* Keyed by the English `title` field stored on each ContentEntry      */
/* (see illubabor-api/prisma/seed.ts). Oromo/Amharic still come        */
/* straight from the API via selectByLanguage.                        */
/* ------------------------------------------------------------------ */

const EN_TRANSLATIONS: Record<string, string> = {
  'Sambo Battlefield': `Historical evidence states that on April 27, 1928, the Italian army made various attempts to capture Finfine, the capital of Ethiopia.

However, the Italian army's expected plan did not succeed. One reason was that the focus shifted from Finfine toward Gore.

The Italian army, which had been eager to capture Finfine, learned that Gore was far from Finfine and that capturing Gore would require considerable effort, and therefore lost hope of achieving its objective quickly.

Even though Italy became discouraged, a force led by General Malta was sent toward Gore through Jimma.

At that time, the army from Ilu Abba Bor had gone to fight in Ogaden.

Among the forces that went to Ogaden, some were killed in battle. About 20,000 of the remaining soldiers returned to Ilu and began fighting to prevent the enemy from capturing Gore.

The force led by General Malta also approached Gore.

Wolde Tsaadq, who governed Gore on behalf of Emperor Haile Selassie, sent commanders toward Sambee to prevent the Italian army from breaking through from the south and entering Gore.

General Malta also sent one military group toward the Sambee battlefield through Aalle and Hadiyya.

Sambee, which is the basis of this written account of the Sambee battlefield victory, is located in Ilu Abba Bor Zone, Aalle Woreda, about 17 km south of Gore Town.

The Fascist Italian forces began fighting Ethiopian patriots from the southern direction in an attempt to capture Gore.

During the fighting, they captured a man called Grazmatch Dhabaa Qambuu.

They brought him to Gore and hanged him in the middle of the town in order to frighten other people into surrendering. Afterwards, they chained Grazmatch Dhabaa Qambuu and kept him imprisoned.

The local population, after seeing the actions of the Italians, felt that courage was better than surrender.

They refused to surrender, saying that they would not give themselves up to the enemy. At that time Emperor Haile Selassie was in England. The people went to the Emperor's palace in Gore and began calling Haile Selassie by telephone to receive further instructions.

Emperor Haile Selassie, while in England, transmitted instructions by telephone.

He ordered the army led by Fitawrari Kabbada Walda Yohannes to fight from the south as far as Tepi, while the group led by Dajazmach Gazahany was ordered to fight from Gimiri northward as far as Sambee.

Historical accounts state that, following these orders and fighting, 300 Italian soldiers fled toward Masha.

A man called Abbaa Xaaloo blocked the routes toward Masha and Gore against the Italians.

The Italian troops who fled toward Masha broke through the blocked route and joined other Italian soldiers.

The Italian army heard that the routes toward Masha and Gore had been blocked.

After hearing this, they came from the south in fear, blocked the road with artillery and machine guns, and waited anxiously for the person who had blocked the road.

Historical evidence states that the army known as Yaxqur Anbassaa in western Ethiopia had been fighting the enemy for a long time.

Especially in the Yeki and Gimira areas, they were supported with British weapons and prevented the enemy from passing toward Gore for seven full months.

They later launched a strong attack against the Italians, defeated the enemy, and joined the force led by Dajazmach Kabbada Waldaya.

This army, led by its deputy commander Shambel Waldayas Bulukko, liberated the area around Gore, raised the Ethiopian flag everywhere, and announced the liberation of Gore.

At that time, 12 Italian battalions located at the country's border planned to come toward Gore from the south, Galab and Gimira.

This information reached the Ethiopian patriots. The people around Sambee joined the Ethiopian patriots and began preventing the Italian army from crossing to Gore.

The army led by Shambel Bulukko, together with the local people, destroyed and cut off Qabar Bridge, which was their crossing route. The bridge was about 90 meters long. Among the Oromo patriots from the Sambee area who organized themselves and cut the Qabar Bridge were Mr. Zawude Lamu, Ayyansoo Bookaa, Margoo Bookaa and Nageessoo Giiloo, among others.

The Italian soldiers became angry and began firing artillery and machine guns at the mountains of Sambee. The fighting at Sambee continued intensely.

Historical evidence states that the army led by Waldayas Bulukko attacked from the east, the army led by Benchii Shawoo attacked from the south, and the army stationed at Gore attacked from the north while carrying the national flag and surrounding the Italians.

The people were happy with the patriots' action. They raised the national flag in the middle of Gore and began walking through the town singing with joy.

Historical evidence states that on June 27, 1933, the Italian army that had approached Gore surrendered. On July 4, 1933, a strong attack was launched against the Italians, and 9 artillery pieces, 46 machine guns and 20,000 small arms were captured.

The captured weapons were loaded onto vehicles, sent to Finfine and distributed to government police and soldiers.

Of the 12,786 Italian soldiers who had been fighting at Sambee, 7,575 surrendered or were captured.

More than 5,000 Italians were killed at Sambee.

Including those captured at Chora and Bedele, a total of 14,750 soldiers were sent through Ambo to Finfine. Among the Oromo patriots who participated in the Sambee battle and fought against the Italians were Zawude Lamu, Ayyansoo Bookaa, Margoo Bookaa, Nageessoo Giiloo, Jaarsoo Abbaa Diidaa, Margoo Faarsoo, Guutamaa Shoroo, Gobbuu Wayyeessaa, Qilxuu Raaboo and Tonoosoo Abbaa Diiduu, among others.`,

  'Qarsaa Googilaa': `Karsaa Googillaa is located in Ilu Abba Bor Zone, Mettu Woreda, Made Kebele. It is located on the western side of Mettu Town beside the road leading to Gore. The name of the place is said to have come from the name of a person called Gaawoo Gillaa.

According to its history, in 1875 the Nafxanya force led by Ras Tessema Nadewe and the Oromo army of Ilu Abba Bor led by Fatansa Ilu fought each other. In the end, it was the place where Fatansa's army was defeated. Today the site is one of the historical places of Mettu Woreda and has been used twice as a place for tourism celebrations in the woreda. (Woreda Culture and Tourism Office)`,

  'Tulluu Gurraachoo (Black Mountain)': `Mount Gurraachoo is located in Ilu Abba Bor Zone, Mettu Woreda, in a place called Barrooyyii Gabbisaa Kebele. The mountain is said to have received this name because it is always covered by cloud/mist and therefore looks black from a distance.

Mount Gurraachoo is one of the highest places in Ilu Abba Bor Zone and is estimated to have an elevation exceeding 3,000 in length/height as described in the source. From its base to its summit takes more than one hour. About thirty minutes into the mountain there is a large cave. The cave is estimated to be more than 50 m long, 60 m high and 5 m wide.

From the summit of Mount Gurraachoo, a person looking around can see, from a distance, the neighboring woredas of Mettu, Aalle, Bure, Darimu, Algee, Hurumu and Bilo Nopa, as well as places such as Dambidollo and Gambela. (Woreda Culture and Tourism Office)`,

  'Genee / Qabar Falls': `Genee Qabar is located in Ilu Abba Bor Zone, Mettu Woreda, Toobbachaa Kebele, in a special place called Janetti. The waterfall is stated in the source to be 121 km from Mettu Town. The Genee Qabar area contains waterfalls, a lake, caves and various natural plants.

Qabar Waterfall is estimated to be about 36 meters long. Qabar Lake was formed where the water from the waterfall flows down; it is estimated to have an area of about 30 square meters and a depth of about 20 m.

The waterfall, lake and cave are surrounded by forest. The forest contains different kinds of trees and roots, including waddeessa, qaraaroo, hoomii, bosoqa, ambabbeessa and harbuu, and roots such as xiwoo, liqixi and geebboo. Wild coffee is also found in the forest. (Mettu Woreda Culture and Tourism Office)

Residents state that during the time of Emperor Haile Selassie, Dajazmach Warqu Inqusilase, who governed Ilu Abba Bor, used to slaughter a bull each year together with local residents and spend time in the area for recreation, including foreign white visitors and their families.`,

  'Kaabii Fatansaa Ilu': `A kaabii is an old type of grave. In Oromo culture, when a well-known person dies, the grave is raised above the ground using soil and stones so that the person's history will not be forgotten. Therefore, Fatansa Ilu's kaabii means his grave. Algaa Gurraachaa is the name of the kebele where the kaabii is located. Fatansa Ilu's religion was the Oromo Waaqeffannaa tradition.

The Kaabii of Fatansa Ilu/Abba Ayyaansoo is located in Algaa Gurraachaa Kebele, Mettu Woreda, Ilu Abba Bor Zone, and is more than 130 years old. Fatansa Ilu was a well-known hero of Ilu Abba Bor. He refused to submit to the Nafxanya forces and was captured while fighting. While under detention he became ill and died. The local people of Algaa Gurraachaa buried him and built the kaabii over his grave. (Mettu Woreda Culture and Tourism Office)

The Kaabii of Fatansa Ilu is about 42 km west of Mettu Town. The kaabii is about 6 m high and its surrounding length/size is described as about 6 m on average. It is located around the residence of Mr. Ayyaanaa Disaasaa Amuumaa. In 2005, Mettu Woreda held a tourism day celebration with the local population at the place where the kaabii is located.`,

  'Onesmos Nasib (Hiikaa Awaajii)': `The history of Oromo literature is connected with the spread of the system of slavery in Ethiopia during the nineteenth century. During this century, because of the slave trade, many young people from different parts of the country were captured and taken away. In particular, many young people from Oromia were captured and sold, and, like goods, were widely taken to European and Arab countries. (Survey of Oromo Literature, Module 301, 2010)

The book states that young men called Waaree and Gaboo were taken from Limmuu and sold into slavery in Europe around 1830. It also states that Oshuu Aagaa, an Oromo child, was captured at a place called Urgeessaa and sold in Cairo, and that Akka Fedhee Daallee was captured by raiders while herding cattle, taken to Gondar and sold. (Survey of Oromo Literature, Module 301, 2010:11–13)

The book Sakatta'a Ogbarruu (2003:37–39) states that Hiikaa Awaajii, an Oromo child born around 1850, experienced the same fate as others.

Hiikaa's father died when Hiikaa was four years old. The people living in the area were divided by clan and were fighting each other. When fighting broke out where Hiikaa lived, Hiikaa's mother took her children away. After the fighting calmed down, she returned home. Unexpectedly, one day enemies attacked them. Hiikaa's mother loved him very much. The enemy frightened the child she loved by shaking a sword and a stick at him, took him away and sold him for the price of four cattle. After he was sold, he lived for two years with the person who bought him. The buyer groomed his hair in different styles and displayed him in the market. Two people who wanted to buy him fought over him, and one killed the other. The buyer who survived sold him for 200 amoole. The next buyer took him to Mitsiwa with the intention of selling him at a high price.

In October 1870, he was brought before a Frenchman whom he feared. At that moment Hiikaa felt that the world had become dark. Later, when the man told him, "Do not worry; from now on we will not hand you over to another person," Hiikaa found it difficult to believe.

In 1871, Munzinger sent Hiikaa to a Swedish mission school so that he could study. The person in charge of the school at the time was Bengt Peter Lundahl. After Hiikaa attended school for one year, he was baptized on Easter Day in 1872 and received the Christian name Onesmos Nasiib. The name means "useful." Onesmos was greatly loved by the missionary. They remained close even when they traveled.

At that time, one thought remained in Onesmos's heart: to return to his people and teach them what he had learned. This thought gave him no rest. At night he would lie as tears fell from his eyes. With a broken heart he prayed, "O God, when will You return me to the land of my fathers? How long will You keep me from going to teach my people?"

Onesmos's desire was not immediately fulfilled. On June 25, 1876, he went to Stockholm to study at the Theological Institute of Johannelund. After studying there for five years, he returned to Mitsiwa in October 1881 and received his diploma as an evangelist/teacher. After returning to the country, he became engaged to a woman named Mihirat Hayiluu.

In January 1882 he began a journey toward Oromo country with his wife, Pastor Samuel, Hayiluu and Filiphos. The journey was difficult and the climate harsh. After many difficulties they reached the banks of the Nile at Fanaka on March 2, 1882. After a month's journey from Fanaka, they reached a border town and heard sad news: there was fighting at the border and there was no security. They were therefore forced to turn back. Because their route passed through the Nubian desert, they suffered greatly from storms, lack of water and malaria. They lost their companion Filiphos. Onesmos became very ill, causing Pastor Samuel great distress. After Onesmos recovered, Pastor Samuel became ill and could not recover; he died in the Nubian desert. After overcoming these difficulties, Onesmos, his wife and Hayiluu reached Imkuluu in July 1882. (Survey of Oromo Literature, Module 301, 2003:37–39)

In 1884 Onesmos received permission from Menelik to pass through Shewa and travel toward Jimma. He began the journey with merchants traveling between Shewa and Mitsiwa. After reaching the Afar area, raiders opened fire, killing 12 people and wounding eight. After a month's journey they reached Shewa. However, Menelik prevented them from passing through Shewa because he had been told that Yohannes, the king of Tigray, had ordered that these people not be allowed to proceed to Jimma. As a result, they were made to stay at a place called Aliyyuu Ambaa. Onesmos then returned to Eritrea. After returning, he continued teaching and translating the Bible.

All these circumstances caused Onesmos great sadness. In order to overcome his grief, he worked harder. He collected and published six thousand Oromo words. In total, Onesmos, together with Aster Ganno, published seven books.

According to the Survey of Oromo Literature (2003:41–42), the books Onesmos prepared with the help of Aster Ganno included:
1. 1887 — Galata Waaqayyoo Gooftaa Maccaa ("Praise be to God, the Lord of Multitudes").
2. 1893 — He translated/revised the New Testament.
3. 1894 — He wrote Jalqaba Barsiisaa, a 174-page book.
4. 1897 — He translated/revised the New and Old Testaments.

This work took 13 years. To have the book printed, he had to travel to Christiania/Switzerland. While there, he heard that one of his daughters had become ill and died and that his two children were also sick. He became very sad and was preparing to return to Mitsiwa when his wife Lydian wrote him a letter encouraging him: "The one who died has died; God will protect those who remain. Continue the work you have." He therefore continued his work.

The printing of the Bible was completed on June 10, 1899.
5. In 1899 he translated two books from English into Oromo. The first was Luther's Catechism, written by Martin Luther.
6. The second, also in 1899, was a book called The Heart of Man, translated from English into Oromo.
7. The book Birth Bible History was also printed in the same year.

Onesmos's work in developing Oromo literature was not limited to writing the first Oromo literary books. Historical evidence also shows that he made great efforts to teach the Gospel to his people using the Oromo language. For this reason he came to be called the Father of Oromo Literature.

However, because his attempts to return to his homeland repeatedly failed and he was already 47 years old, he focused mainly on translating books. Because circumstances forced him to change his decisions, he left Asmara and began a new effort to teach the Oromo people the Gospel and Oromo literature.

His later journey was different from the earlier ones. They traveled by steamship from Mitsiwa to Djibouti. The railway opened in 1902 and made travel between Djibouti and Finfine easier. After Onesmos reached Finfine with his friends and family, they requested permission from Menelik. Menelik assigned a person named Nagadras Haile Giyorgis to help them. They continued toward Wallagga and reached Naqamte in 1904. In September 1904 Onesmos registered 20 children, divided them into three classes and began teaching.

As education in Oromo developed successfully, it created many opponents and some priests began to resent him.

The matter was reported to Dajazmach Kumsa. Onesmos was accused of teaching rebellious education. The authorities investigated whether his activity was proper and stopped the education. Opposition was raised by the Patriarchate of the Ethiopian Orthodox Church, and it was decided that Onesmos should be expelled from the country and prevented from teaching.

Onesmos returned to Naqamte and continued teaching. Because of his age and declining strength, he died in Naqamte on June 23, 1931, and was buried there. (Survey of Oromo Literature, Module 301, 2003:44–45)

Tasgaraa Hirphoo (1999), in the book Abbaa Gammachiis, states that Hiikaa was born around 1850 in the area of Hurumu in Ilu Abba Bor. Hurumu is about 17 km from Mettu. His birthplace was a place called Ooggee in Hurumu. His clan was Waragoo.

The Oromo people living in that area a century ago, as today, mainly lived by raising livestock and farming. Hiikaa's father and mother were also pastoralists. During the dry season, when grass dried up, they traveled long distances with their cattle in search of green pasture. There the enemy attacked and took Hiikaa from his mother. From that day Hiikaa was enslaved. People who enslaved others changed their names. Hiikaa was renamed Nasiib. Nasiib is a slave name; its meaning is "one who has good fortune / one who brings benefit." (Abbaa Gammachiis, 1999:2–4)

Hiikaa was taken to Mitsiwa and sold. When Hiikaa Awaajii reached Mitsiwa, he was a 14-year-old boy. It took him ten years to travel from Hurumu to Mitsiwa. During this time he passed through the hands of three people. The first sold him for four cattle; the next sold him for 200 amoole. In total Hiikaa was sold eight times. The final buyer, Werner Munzinger, told him that he would not be sold again.

Werner Munzinger took Hiikaa and handed him to Swedish missionaries. (Tasgaraa Hirphoo, 1999)

Another document from Mekane Yesus, "Innahuwaati: The Founding and Expansion of the Evangelical Church Mekane Yesus in Ethiopia," states that Onesmos's birth name was Hiikaa Awaajii. He met missionaries because he was taken into slavery from Hurumu, his birthplace in what is now the Ilu Abba Bor Zone of Oromia. After being freed from sale, he was sent to school for evangelical service. History confirms that he became an evangelist. (Mekane Yesus Innahuwaat, 2004:24)

The same book states that Onesmos was an evangelist and the person who translated the Bible into Oromo.

The Grade 10 Oromo Language textbook, when discussing the history of Onesmos Nasiib, states that Onesmos Nasiib was born around 1856 in Hurumu Town, Ilu Abba Bor Zone. His birth name was Hiikaa Awaajii. His father died when he was four. In 1869 raiders/slave traders from another people took Hiikaa from his mother, gave him the new name Nasiib and sold him as a slave. He was sold many times—eight times in total. Finally, a man named Werner Munzinger, who was deputy French consul, found him near Mitsiwa on the Red Sea and freed him from further sale. Swedish Bible missionaries had a school for boys at Imkuluu, so they arranged for Nasiib to study there. Nasiib quickly proved to be an excellent student with special ability. At the age of 16, on Easter, March 31, 1872, he was baptized and given the Christian name Onesmos. Onesmos is Greek for "useful."

After completing five years of study, he was sent to Johannelund, a higher theological institution in Bromma, Sweden, where he studied for another five years. He then returned to Mitsiwa and married a 19-year-old woman named Mihirat Hayiluu.

Because Onesmos had a strong desire to teach his people Oromo, he began traveling toward Wallagga through Sudan with his wife, her father and three other people. However, soldiers of Menelik blocked their journey, so they could not pass Asosa and returned to Famako, on the Ethiopia–Sudan border. Onesmos and his companions reached Khartoum on April 12, 1882. Onesmos then returned to Imkuluu and continued his evangelical work. From that time he began translating different writings into Oromo. After his second attempt to travel to Wallagga failed in 1886, he began translating the entire Bible into Oromo.

Because Onesmos had not grown up among the Oromo people and culture from childhood, he lacked some Oromo words and expressions and therefore needed assistance. By chance he found a young woman named Aster Ganno, who had been taken from Ilu Abba Bor toward Yemen in slavery but was freed at sea by Italian soldiers and was later at Imkuluu. She gave him major assistance in translating writings into Oromo. With her help he completed the translation of the Old Testament into Oromo in June 1897.

In 1904 he went to Wallagga and for the first time began preaching the Bible in Oromo to his people. However, the Orthodox priests in the area strongly opposed him because they did not understand the language. They were also alarmed by the respect and love he had gained among the Oromo people. They accused him of preventing religious observance and brought him before Abuna Matheos, the Orthodox Patriarch. Based on the priest's accusation, Abuna Matheos ordered Onesmos to leave the country.

Onesmos was ordered to return to Naqamte and was later prohibited from preaching the Gospel again. Since his activity among the wider population was restricted, he taught in the school he opened at Naqamte. The book states that until his death he continued translating various writings into Oromo, distributing them, and teaching the Bible.

Among the Oromo writings he prepared were: a 100-page booklet titled Onnee Namaa (The Heart of Man), translated from Greek into Oromo; Luther's Catechism, translated into Oromo; a 600-word Oromo vocabulary collection prepared with Aster Ganno; the Gospel hymn Galata Waaqayyoo Guddaa (Great Praise to God), translated and printed in 1886; and a 79-story book titled Jalqaba Dubbisaa, published in 1894 with Aster Ganno's help.

Overall, Onesmos carried out important and inspiring work during his lifetime. He died on June 21, 1931, after suffering from heart disease. (Grade 10 Oromo Language textbook, 2005:59–61)

A 2007 history document prepared by the Hurumu Woreda Culture and Tourism Office states that Hiikaa was born in Ooggee Kebele, Hurumu Woreda, Ilu Abba Bor Zone, around 1850 to a pastoral family of the Waragoo clan. Some books give his birth year as 1856. The document indicates that around 1850 Oromo communities and outsiders were divided by ethnicity and fighting. One purpose of the fighting was to capture Oromo people and take their cattle.

Although the Oromo often defeated and drove away invaders, they were eventually defeated on one occasion. The victorious invaders took Hiikaa from his mother together with her cattle, and in 1870 Hiikaa was taken to Mitsiwa and sold eight times. The first person who captured him sold him to two people. When the two buyers fought over Hiikaa, one killed the other and then sold him for 200 amoole. His former name was abandoned and he was called Nasiib, meaning "beneficial / fortunate."

The final buyer of Nasiib was Werner Munzinger, the deputy French consul. The document states that from that day he stopped being sold from place to place, gained his freedom and began a new life. The Grade 10 Oromo textbook states that Werner Munzinger found Onesmos Nasiib near Mitsiwa on the Red Sea and placed him in the Swedish Evangelical Mission School established at Mitsiwa. Nasiib had a strong interest and ability in education and was highly valued by the school's director, Bengt Lundahl.

After completing five years of basic evangelical education at Mitsiwa, Onesmos was sent to Stockholm, the capital of Sweden, on June 25, 1876, for higher education. There he studied carpentry, teaching and evangelism for five years, received his diploma and returned to Mitsiwa in 1881. He began teaching his people at Mankuluu, about 10 km from Mitsiwa.

Because he wanted to teach his people the Gospel, Oromo literature and modern education, Onesmos left Mitsiwa in 1881 and tried to enter Oromia through Sudan with his wife, Pastor Askel A. Pelman, Hayiluu and Filiphos. After walking for eight months, they reached Famako on the border of Oromia. Because there was fighting at the border and they did not have permission from the Sudanese ruler, they were forced to return in March 1882. Onesmos did not lose hope and continued teaching the Gospel.

Although his dream of entering Oromia and teaching his people was not fulfilled, he never stopped advancing the Oromo language and literature toward the level they have reached today.

In 1882 he translated a small book titled Onnee Namaa (The Heart of Man) from Greek into Oromo. The book contained 100 hymns. He then translated Luther's Catechism. In 1884 he traveled with British missionaries who were going to meet King Yohannes IV of Abyssinia.

The purpose was to help missionaries through language translation and to send, together with Pastor Lundahl, a letter requesting Menelik's permission to enter Oromia. In 1885, when Onesmos reached Finfine with the missionaries, Menelik prevented him from going to his area. He therefore returned to Mankuluu in 1886 and continued teaching.

After his second attempt to enter Oromia failed, Onesmos planned, together with Oromo people living outside the country, to develop the Oromo language more than before. With the assistance of Aster Ganno, an Oromo woman born in Ilu Abba Bor around 1870, they worked to develop Oromo literature and teach the Gospel and modern education in Oromia.

Some documents state that the Oromo literary works prepared and translated by Onesmos took fifteen years. With Aster Ganno's assistance, in 1885 he prepared a collection of 600 Oromo words. In 1886 he translated and printed the Gospel hymn Galata Waaqayyoo Guddaa (Thanks/Praise to God). In 1893 he translated the New Testament into Oromo. In 1894, with Aster Ganno's assistance, he prepared a 174-page book titled Jalqaba Dubbisaa containing 79 short stories and about 3,600 words.

Because of this work, Hiikaa received the title "Father of Oromo Literature." In addition, Onesmos traveled to Switzerland to study the skills of translating, printing and editing the Bible in depth. He went beyond translating the Bible into Oromo and distributed the translated materials among the Oromo people.

Although he deserved recognition for this work, he was subjected to oppression under a system of ethnic and religious domination and was imprisoned. After being released, in 1905 he was legally prohibited from teaching and preaching in Oromo. He was even prevented from teaching his own children in his home. Missionaries were also prohibited from preaching in languages other than Amharic and English. Despite this, Onesmos Nasiib accomplished great and inspiring work for his people and died in Naqamte on June 21, 1931. (History of Hiikaa Awaajii, Hurumu Woreda Culture and Tourism Office, 2007)`,

  'Marriage Customs (Fuudhaa-Heerumaa)': `Marriage is one of the forms of social life among human beings and means the process through which a person establishes a household. Human beings are naturally connected through social life. Warquu explains this idea as follows: "Marriage is a relationship established between a woman and a man in order to create a husband–wife relationship." (Warquu 2001:155)

One of the major ways in which human beings are socially connected, come together and live together is marriage. It is regarded as the beginning of family relationships. In other words, before establishing a family, a person begins with marriage and establishes a household.

Marriage passes through different processes and has different types. The processes through which marriage passes depend on the type of marriage.

Types of Oromo Marriage

Marriage is carried out in different ways. According to Warquu (2001), marriage in the world is carried out in three ways, while under the laws of our country marriage is conducted through religious, cultural and civil/official procedures.

Although Oromo marriage is performed according to culture, it is divided into different forms depending on how it is performed and the processes it passes through in different places. According to Misgaanuu (2011:20), the well-known types of Oromo marriage through which young women and young men marry and establish households are five: Naqata/Naqataa, Sabbatmarii, Aseennaa, Itti Gala/Waliin Deemuu, and Butii.

Naqata / Naqataa

Naqat or Naqataa is one type of traditional Oromo marriage. It is known among Oromo communities in different areas and is more widely practiced and recognized than many other types of marriage. The Oromo people regard this marriage process as an honor, and especially view it as a form of marriage filled with respect and dignity.

According to Oromo culture, a person who marries his son through Naqataa or arranges for his daughter to marry through Naqataa is regarded as an important/respected person. Not only the parents but also the children who marry through Naqataa receive great respect from their families and local communities and are regarded as blessed children.

This type of marriage is known by different names among Oromo communities: Naqata, Naqataa, Kadhaa, and in some places Gabbara.

In earlier times, in the Naqataa marriage process, it was the family of the groom who decided which girl their son would marry, and the girl's family decided which boy their daughter would marry. After the two families met and completed the necessary processes, the decision was communicated to the young man and woman.

Processes Performed in Naqataa Marriage

Ilaallata — Looking/Selecting. This is the process through which the groom's family looks for and selects a girl for their son, typically at places where many girls gather — firewood-cutting places, markets, singing/wedding gatherings and similar places.

Genealogy / Family Background Investigation. The girl's family background is investigated, focusing on whether the two families are compatible and whether there is a prohibited family relationship between them.

Kadhata — Formal Request. Going to the girl's family home, explaining the situation and asking the girl's family for permission. The girl's family announces its decision on an agreed day, sometimes after considering dreams and signs.

Biqila — Examining the Sign / Fortune. Barley called Samareta is sprouted in both houses; elders, the Gadaa religious leader and neighbors examine the sprout together. A healthy sprout is taken as a good sign for the marriage; a failed sprout may end the process.

Jinfuu Dhaabbata. The day on which the groom's family goes to the girl's family compound and establishes Jinfuu, after which no other family may ask for the same girl.

Naqataa Day. The day on which a ring or ornament is placed on the girl to mark her engagement.

Naqataa Ceremony. The ceremony following the engagement, during which the girl's family asks the groom's family for the things they require.

Wedding Day. The day on which the major marriage processes are completed and the couple is brought together into one household, with ceremonies at both families' homes including food and drink.

Livestock/Gift Receiving Ceremony. The bride's family gives the bride livestock and household items; in Arsi, for example, cattle given to the bride are called "eegawoo."

Morning Wedding Blessing. The groom's family blesses and sends off the groom in the morning; the bride's family similarly blesses her. The blessing is performed at three key moments: when the groom leaves home, when the bride is given inside her parents' house, and when the newlyweds arrive at the groom's family compound.

Rakoo Slaughtering Ceremony. Performed in the evening of the wedding day: an old cow is slaughtered, symbolizing a blessing of long life and prosperity for the bride.

Dhoofsisaa Ceremony. In Arsi custom, livestock given to the girl the young man has married, on the morning after the couple has arrived.

Sabbatmarii / Olnaqii

This type of marriage is performed without the prior consent of the girl's family. The groom's family selects a girl and goes to place grass at her family's compound without first asking permission — often used when the two families are unlikely to agree, or when the groom's family wants to speed up a wedding already informally agreed upon. If the girl's family refuses, elders from both sides intervene to negotiate reconciliation.

Aseennaa

A type of marriage that begins with an agreement between the girl and the young man themselves, initiated when the young man communicates his intention through the girl's friend or relative after seeing her at a market, singing gathering or while cutting firewood.

Itti Gala

Means "joining/entering together" — the girl goes to the groom's family home and joins the young man there. This practice has its own rules, which vary by local community.

Butii

A type of marriage performed without the girl's consent and through force. It may arise from various causes and can result in harm to people and property during the abduction.`,

  'Gumaa — Reconciliation System': `The Oromo people have their own system of governance. According to this system, elders govern the people by establishing and following customary laws. Gumaa is one of these customary laws.

Gumaa is one of the institutions used by the people. Elders follow customary law and use discussion among relatives to reconcile people who have fought, bring together people who have killed one another, and heal the community by determining and carrying out Gumaa. The reason for carrying out Gumaa is to prevent the people involved in a killing from taking revenge or restarting conflict between them.

The way Gumaa is carried out has its own process. The two people who fought and killed each other are generally related by descent or belong to the same clan. Therefore, according to Oromo custom, the two clans/families are responsible for arranging the conditions under which Gumaa is carried out.

Gumaa has an important place in the history of coexistence between the Oromo and neighboring peoples. It is a system through which a group that has taken a life and the family from whom the life was taken are reconciled. The people responsible for taking a life pay what the elders determine according to Gumaa law.

The payment is not understood simply as a price replacing the value of a human life. Rather, Gumaa is understood as a means by which a person who has committed wrongdoing cleanses himself from the wrongdoing and restores kinship. Decisions are based on Gumaa law, which distinguishes between a person who killed knowingly/intentionally and one who killed accidentally.

Those who commit a killing are not necessarily required to collect the entire payment from their own property alone. A person who killed another may travel among members of his clan, relatives and even people in other places, explain the wrongdoing, receive assistance and collect the required payment.

Although Gumaa later developed a broad social and political meaning, originally it referred to meat from an animal that was slaughtered and divided or given as food on the reconciliation day to the clan of the deceased and the clan of the killer. Because the amount of meat distributed was small, people said, "We ate Gumaa." Today Gumaa is known in the community as a system for determining compensation for a life taken and as a system through which reconciliation is conducted.

In the Gadaa system it is difficult to completely separate social and political functions. Although Gumaa has a broad social dimension, it also has a political aspect because it is part of governance. The system is a way for people who were enemies to become friends again.

Before reconciliation takes place, immediately after a killing, the person who took the life and his family may cross or leave the village or zone and flee — crossing rivers and mountains — expressing the respect they have for human life; a person who has taken a human life cannot remain at his own home until Gumaa has been carried out.

Under old Oromo law, an Oromo person did not intentionally kill another Oromo person except in an accident; this was called the Oromo oath/custom. Even when Oromos had weapons in their hands, if conflict arose they were traditionally expected to turn their weapons away and fight without stabbing each other with them; killing by weapon was prohibited. If this old oath was forgotten and a killing occurred, it was customary to resolve the conflict by carrying out Gumaa.

One of the Oromo customary laws also prohibited the intentional killing of women. If it happened accidentally, Gumaa was carried out rather than allowing revenge. Elders say that in earlier times Oromos captured women and children during raids but did not kill them, because the wrongdoing against a woman's life was considered more serious.

A person who took a life was given a severe punishment. Even if he possessed enough cattle or property to pay the Gumaa himself, he could be required to ask his clan and family to help pay it. For this reason, his father might leave the country or stand on a main road holding a chain and ask for help paying the Gumaa.

When the Gumaa ceremony is conducted, necessary items are prepared: different kinds of food and drink, a black sheep, 100 bundles/items of a specified type, five Ashaboo Amoolee, a specified amount of money in coins (Callaa), and other materials. Well-known elders of the village oversee the process. The two parties who had the dispute stand on opposite sides of a river, and the community elder facilitates the process so that Gumaa law is carried out, on a day considered clean/holy.

The selected elder gives wet grass called coqorsa by hand to the two people who have come for reconciliation, one standing on each side of the river, and begins with a blessing that brings the two disputing parties to reconciliation. Each prepared item has its own role: a sheep is slaughtered between the two disputing parties and its blood is put into the water, after which they hold hands so that they will not seek one another again; Ashaboo Amoolee carries a similar symbolic meaning. After reconciliation, they eat the prepared food and drink, make peace, and complete the Gumaa ceremony. When they return home, the prepared coins are distributed to the people who requested help.`,
};

/** Returns the best available body text for a content entry, in the given language. */
function getBody(entry: ContentEntry, lang: Lang): string {
  if (lang === 'en' && EN_TRANSLATIONS[entry.title]) return EN_TRANSLATIONS[entry.title];
  return selectByLanguage(entry, 'body', lang);
}

/** Returns a short summary for list view — the stored summary, or the first ~220 chars of the body. */
function getSummary(entry: ContentEntry, lang: Lang): string {
  if (entry.summary || entry.summaryOm || entry.summaryAm) {
    return selectByLanguage(entry, 'summary', lang);
  }
  const body = getBody(entry, lang);
  return body.length > 220 ? `${body.slice(0, 220).trim()}…` : body;
}

export default function AboutPage() {
  const { language } = useLanguage();
  const lang = language as Lang;
  const { zone } = useZone();
  const { value: mapImage } = useSiteConfig<string>('geography_map_url', '');
  const [tab, setTab] = useState<TabKey>('history');
  const [selected, setSelected] = useState<ContentEntry | null>(null);

  const { entries: places, loading: placesLoading } = useContent('HISTORICAL_SITE');
  const { entries: cultureTopics, loading: cultureLoading } = useContent('CULTURAL_TOPIC');

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-semibold text-ink-950">
        {lang === 'om' ? "Waa'ee Godina Illubaabor" : lang === 'am' ? 'ስለ ኢሉአባቦር ዞን' : 'About Illubabor Zone'}
      </h1>

      <div className="mt-8 flex gap-1 overflow-x-auto border-b border-coffee-950/10">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => { setTab(t.key); setSelected(null); }}
            className={`whitespace-nowrap px-4 py-2.5 text-sm font-medium transition-colors ${
              tab === t.key ? 'border-b-2 border-clay-600 text-ink-950' : 'text-ink-600 hover:text-ink-950'
            }`}
          >
            {t.label[lang]}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {tab === 'history' && (
          <div className="rounded-lg border border-coffee-950/10 bg-white p-6">
            <p className="whitespace-pre-line text-sm leading-relaxed text-ink-800">{HISTORY_TEXT[lang]}</p>
          </div>
        )}

        {tab === 'geography' && (
          <div className="space-y-6">
            <div className="overflow-hidden rounded-lg border border-coffee-950/10">
              <iframe
                title="Illubabor Zone map"
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${MAP_BBOX}&layer=mapnik&marker=${MAP_MARKER}`}
                className="h-80 w-full border-0"
                loading="lazy"
              />
              <div className="bg-parchment-100 px-4 py-2 text-right text-xs">
                
                  href={`https://www.openstreetmap.org/?mlat=8.35&mlon=35.58#map=9/8.35/35.58`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-clay-600 hover:underline"
                >
                  {lang === 'om' ? 'Kaardii Guddaa Ilaali' : lang === 'am' ? 'ትልቅ ካርታ ይመልከቱ' : 'View larger map'}
                </a>
              </div>
            </div>

            {mapImage && (
              <img src={mapImage} alt="Illubabor Zone map" className="w-full rounded-lg border border-coffee-950/10" />
            )}

            <div className="rounded-lg border border-coffee-950/10 bg-white p-6">
              <p className="whitespace-pre-line text-sm leading-relaxed text-ink-800">{GEOGRAPHY_TEXT[lang]}</p>
              {zone && (
                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <div className="rounded-md bg-parchment-100 p-3 text-center">
                    <div className="font-display text-lg font-semibold text-ink-950">{zone.areaKm2?.toLocaleString()}</div>
                    <div className="text-xs text-ink-600">km²</div>
                  </div>
                  <div className="rounded-md bg-parchment-100 p-3 text-center">
                    <div className="font-display text-lg font-semibold text-ink-950">{zone.elevationMin ?? '—'}–{zone.elevationMax ?? '—'}m</div>
                    <div className="text-xs text-ink-600">Elevation</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {tab === 'places' && (
          <ContentList
            entries={places}
            loading={placesLoading}
            selected={selected}
            onSelect={setSelected}
            lang={lang}
          />
        )}

        {tab === 'culture' && (
          <ContentList
            entries={cultureTopics}
            loading={cultureLoading}
            selected={selected}
            onSelect={setSelected}
            lang={lang}
          />
        )}
      </div>
    </div>
  );
}

function ContentList({
  entries, loading, selected, onSelect, lang,
}: { entries: ContentEntry[]; loading: boolean; selected: ContentEntry | null; onSelect: (e: ContentEntry | null) => void; lang: Lang }) {
  if (loading) return <div className="text-sm text-ink-600">Loading…</div>;
  if (entries.length === 0) return <p className="text-sm text-ink-600">Nothing added yet.</p>;

  if (selected) {
    return (
      <div>
        <button onClick={() => onSelect(null)} className="text-sm text-clay-600 hover:underline">
          ← {lang === 'om' ? 'Deebi\'i' : lang === 'am' ? 'ተመለስ' : 'Back to list'}
        </button>
        <div className="mt-4 overflow-hidden rounded-lg border border-coffee-950/10 bg-white">
          {selected.imageUrl && <img src={selected.imageUrl} alt="" className="h-64 w-full object-cover" />}
          <div className="p-6">
            <h3 className="font-display text-xl font-semibold text-ink-950">
              {selectByLanguage(selected, 'title', lang)}
            </h3>
            <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-ink-800">
              {getBody(selected, lang)}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {entries.map((e) => (
        <button
          key={e.id}
          onClick={() => onSelect(e)}
          className="overflow-hidden rounded-lg border border-coffee-950/10 bg-white text-left transition-shadow hover:shadow-md"
        >
          {e.imageUrl && <img src={e.imageUrl} alt="" className="h-40 w-full object-cover" />}
          <div className="p-4">
            <h3 className="font-display text-base font-semibold text-ink-950">
              {selectByLanguage(e, 'title', lang)}
            </h3>
            <p className="mt-1 text-sm text-ink-600 line-clamp-2">{getSummary(e, lang)}</p>
            <p className="mt-2 text-xs text-clay-600">
              {lang === 'om' ? 'Dabalata Ilaali →' : lang === 'am' ? 'ተጨማሪ ይመልከቱ →' : 'Read more →'}
            </p>
          </div>
        </button>
      ))}
    </div>
  );
}