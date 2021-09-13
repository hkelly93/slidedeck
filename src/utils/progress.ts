export const calculateProgress = (
  activeSlide: number,
  totalSlides: Array<any>
) => (activeSlide / totalSlides.length) * 100;
