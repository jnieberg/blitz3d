import fs from "fs";

export const requireBB = (/** @type {string} */ file) => fs.readFileSync(`test/code/${file}.bb`, { encoding: "utf8" });

const blitzTestData = [
  {
    name: "goto",
    bb: requireBB("goto"),
    js: `___label2:while(await _async()){___label1:while(await _async()){var label1;var label2;__label1_:while(await _async()){_cls();_print("The program starts ...");await _delay(1000);break;_print("This line never gets printed ..");_end();break;}break;}__label2_:while(await _async()){_print("We just jumped here!");while(await _async()&&(!_keyhit(1))){}continue ___label2;break;}break;}`,
  },
  {
    name: "if then",
    bb: requireBB("if-then"),
    js: `var _name;_name=await _input("What is your name? ");if(_name=="Shane"){_print("You are recognized, Shane! Welcome!");}else{_print("Sorry, you don't belong here!");}`,
  },
  {
    name: "select case",
    bb: requireBB("select-case"),
    js: `var _mission;_mission=_rnd(1,10);switch(_toint(_mission)){case 1:_print("Your mission is to get the plutonium and get out alive!");break;case 2:_print("Your mission is to destroy all enemies!");break;case 3:_print("Your mission is to steal the enemy building plans!");break;default:_print("Missions 4-10 are not available yet!");}`,
  },
  {
    name: "type field",
    bb: requireBB("type-field"),
    js: `var _chair;var x;var y;var height;var _tempx;var _tempy;var _room;var _chair=new _Type({x,y,height,});for(_tempx=1;_tempx<=10;_tempx+=1){for(_tempy=1;_tempy<=10;_tempy+=1){_room=_new(_toint(_chair));_room.x=_toint(_tempx);_room.y=_toint(_tempy);_room.height=_rnd(0,10);}}for(_room of _each(_toint(_chair))){_room.x=_room.x+1;}for(_room of _each(_toint(_chair))){_print(_room.x," - ",_room.y);}`,
  },
  {
    name: "keyhit",
    bb: requireBB("keyhit"),
    js: `var _current;_current=_millisecs();_print("Press ESC a bunch of times for five seconds...");while(await _async()&&(_millisecs()<_toint(_current)+5000)){}_print("Pressed ESC ",_keyhit(1)," times.");`,
  },
  {
    name: "float",
    bb: requireBB("float"),
    js: `var _s;_print("Enter some text to be converted using Float().");_print("Hit ENTER to exit.");do{_s=await _input(">");if(_tostring(_s)!=""){_print("Float(",_chr(34)+_tostring(_s)+_chr(34),")=",_float(_tostring(_s)));}}while(await _async()&&!(_s==""));_end();`,
  },
  {
    name: "rnd",
    bb: requireBB("rnd"),
    js: `var _k;var _state;_seedrnd(_millisecs());for(_k=1;_k<=12345;_k+=1){_rnd(1);}_state=_rndseed();_print("First set:");for(_k=1;_k<=5;_k+=1){_print(_rnd(1));}_seedrnd(_toint(_state));_print("Second set (same as the first set...):");for(_k=1;_k<=5;_k+=1){_print(_rnd(1));}`,
  },
  {
    name: "font",
    bb: requireBB("font"),
    js: `_graphics(800,600,16);var _fntarial,_fntarialb,_fntariali,_fntarialu;_fntarial=await _loadfont("Arial",24,0,0,0);_fntarialb=await _loadfont("Arial",18,1,0,0);_fntariali=await _loadfont("Arial",32,0,1,0);_fntarialu=await _loadfont("Arial",14,0,0,1);_setfont(_toint(_fntarial));_text(400,0,"This is just plain Arial 24 point",1,0);_setfont(_toint(_fntarialb));_text(400,30,"This is bold Arial 18 point",1,0);_setfont(_toint(_fntariali));_text(400,60,"This is italic Arial 32 point",1,0);_setfont(_toint(_fntarialu));_text(400,90,"This is underlined Arial 14 point",1,0);while(await _async()&&(!_keyhit(1))){}_freefont(_toint(_fntarial));_freefont(_toint(_fntarialb));_freefont(_toint(_fntariali));_freefont(_toint(_fntarialu));`,
  },
  {
    name: "mouse",
    bb: requireBB("mouse"),
    js: `_graphics(640,480);_setbuffer(_backbuffer());do{_cls();_text(320,0,"Click to reset mouse",1);_text(0,0,"Mouse X:"+_mousex());_text(0,10,"Mouse Y:"+_mousey());if(_mousedown(1)||_mousedown(2)){_movemouse(320,240);}_text(_mousex(),_mousey(),"X",1,1);_flip();}while(await _async()&&!(_keyhit(1)));_end();`,
  },
  {
    name: "rect",
    bb: requireBB("rect"),
    js: `var _box_x;var _box_y;_graphics(640,480);_setbuffer(_backbuffer());_box_x=-20;_box_y=100;while(await _async()&&(!_keyhit(1))){_cls();_rect(_toint(_box_x),_toint(_box_y),20,20,1);_flip();_box_x=_toint(_box_x)+1;if(_box_x==640){_box_x=-20;}}`,
  },
  {
    name: "color",
    bb: requireBB("color"),
    js: `var _t;_graphics(320,200);_setbuffer(_backbuffer());for(_t=1;_t<=1000;_t+=1){_color(_rnd(255),_rnd(255),_rnd(255));_rect(_rnd(320),_rnd(200),10,10,1);}_getcolor(100,100);_print("Box at 100,100 is RGB:",_colorred(),",",_colorgreen(),",",_colorblue(),"!");_flip();while(await _async()&&(!_keyhit(1))){}`,
  },
  {
    name: "types",
    bb: requireBB("types"),
    js: `let _i=1.1;_print(_toint(_i)+_toint(_i));let _s=1.1;_print(_tostring(_s)+_tostring(_s));let _f=1.1;_print(_tofloat(_f)+_tofloat(_f));`,
  },
  {
    name: "gamma",
    bb: requireBB("gamma"),
    js: `var _n;var _k;_graphics(640,480,16,1);_setbuffer(_backbuffer());_n=0;while(await _async()&&(!_keyhit(1))){if(_keydown(203)&&_toint(_n)>0){_n=_toint(_n)-1;}if(_keydown(205)&&_toint(_n)<255){_n=_toint(_n)+1;}if(_keydown(29)){_setgammared(_toint(_n));}else{_setgammaintensity(_toint(_n));}_cls();_seedrnd(1234);for(_k=1;_k<=1000;_k+=1){_color(_rnd(255),_rnd(255),_rnd(255));_rect(_rnd(640),_rnd(480),_rnd(64),_rnd(64));}_text(0,0,"Intensity offset="+_toint(_n));_flip();}_end();async function _setgammared(_n){let _k;for(_k=0;_k<=255;_k+=1){_setgamma(_toint(_k),_toint(_k),_toint(_k),_toint(_k)+_toint(_n),0,0);}_updategamma();}async function _setgammaintensity(_n){let _k;for(_k=0;_k<=255;_k+=1){_setgamma(_toint(_k),_toint(_k),_toint(_k),_toint(_k)+_toint(_n),_toint(_k)+_toint(_n),_toint(_k)+_toint(_n));}_updategamma();}`,
  },
  {
    name: "shr",
    bb: requireBB("shr"),
    js: `var _value;_value=100;_print("Shift 1 bit left; Value = ",_toint(_value)<<1);_print("Shift 2 bits left; Value = ",_toint(_value)<<2);_print("Shift 4 bits left; Value = ",_toint(_value)<<4);_print("Shift 1 bit right; Value = ",_toint(_value)>>1);_print("Shift 2 bits right; Value = ",_toint(_value)>>2);_print("Shift 4 bits right; Value = ",_toint(_value)>>4);_print("Shift by SAR 4 times = ",_toint(_value)>>>4);await _waitkey();`,
  },
  {
    name: "include",
    bb: requireBB("include"),
    js: `var _a;_a="This is the original value";_a="Value is changed in the include file";_print(_tostring(_a));`,
  },
  {
    name: "dim",
    bb: requireBB("dim"),
    js: `var _grid;var _y;var _x;var _grid=_dim(10,10);for(_y=0;_y<=10;_y+=1){for(_x=0;_x<=10;_x+=1){_grid[Math.trunc(_toint(_x))][Math.trunc(_toint(_y))]=_rand(10,99);}}for(_y=0;_y<=10;_y+=1){for(_x=0;_x<=10;_x+=1){_text(_toint(_x)*40,_toint(_y)*20,_grid[Math.trunc(_toint(_x))][Math.trunc(_toint(_y))]);}}`,
  },
  {
    name: "data",
    bb: requireBB("data"),
    js: `_data("startdata",3,"Shane",31,33.3333,"Monroe","Bob",28,12.25,"Smith","Roger",54,66.66,"Rabbit");var startdata;var _users;var _t;var _firstname;var _age;var _accuracy;var _lastname;_print("Here we go!");_restore("startdata");_users=_read(_toint(_users));for(_t=1;_t<=_toint(_users);_t+=1){_firstname=_read(_tostring(_firstname));_age=_read(_toint(_age));_accuracy=_read(_tofloat(_accuracy));_lastname=_read(_tostring(_lastname));_print(_tostring(_firstname)," ",_tostring(_lastname)," is ",_toint(_age)," years old with ",_tofloat(_accuracy)," accuracy!");}while(await _async()&&(!_keyhit(1))){}_end();`,
  },
];

export default blitzTestData;
