const base = {
  mainTextFontWeight: '500',
  listItemBcgColor: 'rgba(157, 153, 153, 0.253)',
  backdropColor: 'rgba(0, 0, 0, 0.2)',
  hoverTransition: '300ms',
  hoverTimeFunction: 'linear',
  animationDuration: '300ms',
  animationTimeFunction: `linear`,
};

export const light = {
  ...base,
  name: 'Light',
  bgColor: '#fff',
  textColor: '#000',
  bgElementColor: '#60D0CA',
  elementColor: '#fff',
  bgElementHoverColor: '#50aaa6',
  boxShadow: ' 0px 5px 10px 2px rgba(34, 60, 80, 0.2)',
};

export const dark = {
  ...light,
  name: 'Dark',
  bgColor: '#2D2831',
  textColor: '#fff',
  bgElementColor: '#8c6fcf',
  bgElementHoverColor: '#715ba7',
};

export const blue = {
  ...light,
  name: 'Blue',
  bgColor: '#41418a',
  textColor: '#fff',
  bgElementColor: '#c9cf6f',
  bgElementHoverColor: '#c4c393',
};
