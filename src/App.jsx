import { useState, useEffect } from 'react';
import s from './App.module.scss';
//import img from './images/spacex_logo.png';
import { ReactComponent as Svg } from './images/Svg_true.svg';
import cn from 'classnames';

function App() {
    const [activeBtn, setActiveBtn] = useState('');

    const mottoWords = ['Начать путешествие', 'ПОЕХАЛИ', 'Вперёд к звёздам', 'На край вселенной'];
    const [counter, setCounter] = useState(0);
    const [mottoBtn, setMottoBtn] = useState(mottoWords[0]);
    const [burgerState, setBurgerState] = useState(false);
    const [titleArr, setTitleArr] = useState([]);
    const [subtitleArr, setSubtitleArr] = useState([]);
    const [box1Arr, setBox1Arr] = useState([]);
    const [box2Arr, setBox2Arr] = useState([]);
    const [box3Arr, setBox3Arr] = useState([]);
    const [box4Arr, setBox4Arr] = useState([]);

    const activateBtn = (data) => {
        console.log(data);
        setActiveBtn(data);
    };

    const burgerToggle = () => {
        setBurgerState((prev) => !prev);
    };
    const burgerClose = () => {
        setBurgerState(false);
        document.querySelector('body').style.overflow = null;
    };
    useEffect(() => {
        document.querySelector('body').style.overflow = burgerState ? 'hidden' : null;
    }, [burgerState]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(
                `https://api.airtable.com/v0/appUm0LdGEW2wb0vH/Table%201?api_key=${process.env.REACT_APP_SAR_API_KEY}`
            );
            const data = await response.json();
            //console.log(data.records[5].fields.Name);
            if (data) {
                data.records.map((elem) => {
                    let namei = elem.fields.Name;
                    let mNote = elem.fields.main_note;
                    let mdNote = elem.fields.mid_note;
                    let lNote = elem.fields.last_note;
                    switch (namei) {
                        case 'title':
                            setTitleArr([]);
                            return setTitleArr([...titleArr, mNote]);
                        case 'subtitle':
                            setSubtitleArr([]);
                            return setSubtitleArr([...subtitleArr, mNote]);
                        case 'box_1':
                            setBox1Arr([]);
                            return setBox1Arr([...box1Arr, mNote, mdNote, lNote]);
                        case 'box_2':
                            setBox2Arr([]);
                            return setBox2Arr([...box2Arr, mNote, mdNote, lNote]);
                        case 'box_3':
                            setBox3Arr([]);
                            return setBox3Arr([...box3Arr, mNote, mdNote, lNote]);
                        case 'box_4':
                            setBox4Arr([]);
                            return setBox4Arr([...box4Arr, mNote, mdNote, lNote]);
                        default:
                            console.log('Sorry!');
                    }
                    return console.log('map return');
                });
            }
        };
        fetchData().catch((err) => {
            console.error(err);
        });
    }, []);

    useEffect(() => {
        if (counter >= 4) {
            setCounter(0);
        }
        setMottoBtn(mottoWords[counter]);
    }, [counter]);

    return (
        <section className={s.space}>
            <div className={s.bar_cover}></div>
            <div className={s.container}>
                <header>
                    <div className={s.logo}>
                        {/* <img src={img} alt='spaceX Logo' /> */}
                        <Svg className={s.logo_svg} />
                        <div className={s.logo_sq}></div>
                        <div className={s.logo_sq}></div>
                        <div className={s.logo_sq}></div>
                        <div className={s.logo_sq}></div>
                    </div>
                    <nav className={burgerState ? s.burger_active : s.burger_close}>
                        <ul onClick={burgerClose}>
                            <li>Главная</li>
                            <li>Технологии</li>
                            <li>График полётов</li>
                            <li>Гарантии</li>
                            <li>О компании</li>
                            <li>Контакты</li>
                        </ul>
                    </nav>
                    <button className={s.burger_icon} onClick={burgerToggle}>
                        <div className={s.burger_line}></div>
                        <div className={s.burger_line}></div>
                        <div className={s.burger_line}></div>
                    </button>
                </header>
                <div className={s.column_wrap}>
                    <div className={s.column_jorney}>
                        <div className={s.space_calls}>
                            <div className={s.space_calls_title}>{titleArr}</div>
                            <div className={s.space_calls_subtitle}>{subtitleArr}</div>
                        </div>
                        <button
                            className={s.space_btn}
                            onClick={() => setCounter((prev) => prev + 1)}
                        >
                            {mottoBtn}
                        </button>
                        <div className={s.space_btn_info}>
                            <span></span>
                        </div>
                    </div>
                    <div className={s.column_about}>
                        <div
                            className={cn(s.about_sq, s.about_D, {
                                [s.about_active_D]: activeBtn === 'D',
                            })}
                            onClick={(e) => activateBtn('D')}
                        >
                            <div className={s.about_wrap}>
                                <div className={s.about_overtitle}>{box4Arr[0]}</div>
                                <div className={s.about_title}>{box4Arr[1]}</div>
                                <div className={s.about_subtitle}>{box4Arr[2]}</div>
                            </div>
                        </div>
                        <div
                            className={cn(s.about_sq, s.about_A, {
                                [s.about_active_A]: activeBtn === 'A',
                            })}
                            onClick={(e) => activateBtn('A')}
                        >
                            <div className={s.about_wrap}>
                                <div className={s.about_overtitle}>{box1Arr[0]}</div>
                                <div className={s.about_title}>{box1Arr[1]}</div>
                                <div className={s.about_subtitle}>{box1Arr[2]}</div>
                            </div>
                        </div>
                        <div
                            className={cn(s.about_sq, s.about_B, {
                                [s.about_active_B]: activeBtn === 'B',
                            })}
                            onClick={(e) => activateBtn('B')}
                        >
                            <div className={s.about_wrap}>
                                <div className={s.about_overtitle}>{box2Arr[0]}</div>
                                <div className={s.about_title}>{box2Arr[1]}</div>
                                <div className={s.about_subtitle}>{box2Arr[2]}</div>
                            </div>
                        </div>
                        <div
                            className={cn(s.about_sq, s.about_C, {
                                [s.about_active_C]: activeBtn === 'C',
                            })}
                            onClick={(e) => activateBtn('C')}
                        >
                            <div className={s.about_wrap}>
                                <div className={s.about_overtitle}>{box3Arr[0]}</div>
                                <div className={s.about_title}>{box3Arr[1]}</div>
                                <div className={s.about_subtitle}>{box3Arr[2]}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default App;
