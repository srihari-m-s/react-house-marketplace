export default function MapPlaceholder({ location }) {
  return (
    <div className="w-full grid place-items-center">
      <p>
        Map marked with location of {location}.{" "}
        <noscript>You need to enable JavaScript to see this map.</noscript>
      </p>
    </div>
  );
}
