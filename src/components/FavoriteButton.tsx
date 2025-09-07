export default function FavoriteButton({ isFavorite }: { isFavorite: boolean }) {
  return <button>{isFavorite ? '❤️' : '🫀'}</button>;
}
