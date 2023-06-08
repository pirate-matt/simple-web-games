import styles from './wordcloudchart.module.css';

export default function WordCloudChart({
  countLabel,
  visualizingDescriptor,
  wordCountsByWord = {},
}) {

  return (
    <div
      className={styles['chart--word-cloud']}
      aria-label={
        `chart visualizing ${visualizingDescriptor}`
        + ` by increasing the size of the word in proportion to it's "${countLabel}" count`
      }
    >
      TODO: WordCloudChart
    </div>
  );
}