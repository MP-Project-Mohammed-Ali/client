import React from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import Nav from "../Nav";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";

function Home() {
  const Navigate = useNavigate();

  const register = () => {
    Navigate("/regist");
  };

  const login = () => {
    Navigate("/login");
  };

  return (
    <>
      <Nav />

      <div className="home1"></div>
      <main className="mainhome">
     
        <div className="image-intro">
          <div className="first-section">
            <img
              src="https://cdn02.qudsn.co/thumb/w1110/uploads/images/2020/06/Ri073.jpg"
              alt="Mountain peak covered in snow"
            />
            
            <div className="info-background">
              <p className="homep">
                المُحاماَة فَنّ قَبْلَ أَن تَكُون مِهْنَة .. لِيس المُحامُونَ
                مُحامِيْنَ كَلَهِم بِالضَرُورَة .. لِيس عَمَل المُحامِي فَقَط
                مَعْرِفَة القانُون .. فَالكَثِير يُعَرِّف النُصُوص حَتَّى مِن
                غَيَّرَ المُحامِيْنَ .. لَكُننَ حَقِيقَة دَوْر المُحامِي تَكْمُن
                فِيَّ دَرّاسَة الوَقائِع كَدَرّاسَة القانُون وَالنَظَر إِلَى ما
                يَمْثُل هٰذِهِ الوَقائِع فِيَّ نَصَوْص القانُون .. المُحاماَة
                فَنّ الحُجَّة وَالجَدَل وَالبُرْهان وَالإِقْناع .. فَقَدَ كَآن
                رُوّاد الفَلْسَفَة مُحامِيْنَ بِما يُمَلِّكُونَ مِن حُجَج
                وَلُغَة عالِيَة وَنَظْرَة ثاقِبَة .. وَكَثِير مِن الشَعْراء
                كانُوا مُحامِيْنَ بِما يَمْتَلِكُونَ مِن أَدَوات اللُغَة
                وَالبَلاغَة وَالفَطِنَة .. فَلَيْسَ عَمَل المُحامِي الفَصْل
                فِيَّ النُزّاع إِنَّما هُو عَمَل القاضِي . لِيس مِن عَمَل
                المُحامِيْنَ قَلَّبَ الثَوابِت أُو تظليل الحَقائِق .. فَلا
                تُشْعِر بِالفَخْر كَثِيرا عَنْدَماً تَوَزَّعَ الرَشاوَى لِكَسْب
                القَضايا لِأَنَّكِ أَصْبَحتِ مُجْرِماً بِسَبَب مُجْرِم فَأَنَت
                إِذْن مِثْلهُ لِأَنَّكِ تُخْسِر ذاتكَ لِتَرْبَح قَضِيَّة ..
                فَالقَضِيَّة رابِحَة وَ سَتُكَوِّن أَنَت الخاسِر .. أَن تَسْرِق
                حُقُوق زُمَلاءكَ المُحامِيْنَ وَإِن تَنافَسَهُم بِصُور غَيَّرَ
                مَشْرُوعَة فَهٰذا أَقْرَب لِلدَناءَة وَ أُبْعِدَ ما يَكُون مِن
                الأَخْلاق الرَفِيعَة آلَتَيْيَ هِيَ أَساس مَهَنتُكِ .. لا
                تُكْذَب وَ لا تُعْط الوُعُود فَأَنَت لَسْتِ صاحِب قَرار وَلُستَ
                مَسْؤُولاً عَن النَتائِج .. وَ قَبْلَ ذُلّكَ كُلّهُ كَنَّ
                إنســانا لِتُكَنّ مُحامِيا .. لا تُكَسِّب دَعْوَى وَتَخْسَر
                نَفِسَكَ ..
              </p>
            </div>
          </div>
          <div className="second-section">
            <img
              src="https://mybayutcdn.bayut.com/mybayut/wp-content/uploads/ar-%D9%82%D8%A7%D9%86%D9%88%D9%86-%D8%A7%D9%84%D8%A7%D9%8A%D8%AC%D8%A7%D8%B1-%D9%81%D9%8A-%D8%A3%D8%A8%D9%88%D8%B8%D8%A8%D9%8A-new.jpg"
              alt="Looking over peaks from inside a plane"
            />
            <div className="">
              <p className="homep">
                إنها رسالة مقدسة انها رسالة الدفاع ، عندما تقف بجوار متهم بريء
                لم تثبت إدانته ، لتدافع عنه بعد ان هجره أهله ، وتنكر له أصدقاءه
                ، وتشمت به أعداءه ، وانصبت عليه لعنة الناس أجمعين ، تقف بجانبه
                وسط صخب الإعلام ، حتى يحين اليوم المعود ، فتدخل قاعة المحكمة
                تترقبك الأنظار وسط همز ولمز ، فتبدأ المرافعة وكأنها معركة في
                ساحة القضاء ، تجلجل بصوت الحق حيث لا صوت إلا صوتك ، لتتفنن في
                المرافعة ، تشد العقول بالقول المقبول ، تلهب القلوب بحلاوة اللسان
                وسحر البيان ، تبهر السامعين والناظرين بكلمات تبث الامان في قلب
                المتهم الحيران ، لا تغيب عنك فكرة ولا يتعثر لك لسان ، لا أنت
                بساحر ولا جان ، وإنما أنت إنسان أنت المحامي ، الذي لا يتخلى عن
                أي متهم مهما كان ، وكلما زاد صراخ الصارخين كلما كانت حاجة المتهم
                إليك اشد وأقوى ، انت محامي .. اذن انت تعمل في مهنة الجبابرة .
              </p>
            </div>
            </div>
          </div>
        
        <footer>
          <div className="copyright-info">
            <p>جميع الحقوق محفوظة © 2022 محمد الوهيد </p>
          </div>
        </footer>
      </main>
    </>
  );
}

export default Home;
