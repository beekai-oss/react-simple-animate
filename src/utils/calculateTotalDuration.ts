export default ({
  duration = 0.3,
  delay = 0,
  overlay = 0,
}: {
  duration?: number;
  delay?: number;
  overlay?: number;
}): number => duration + delay - overlay || 0;
