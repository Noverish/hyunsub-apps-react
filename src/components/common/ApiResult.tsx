interface Props extends React.HTMLAttributes<HTMLDivElement> {
  result: any;
}

export default function ApiResult({ result, ...rest }: Props) {
  return (
    <div {...rest}>
      <pre><code>{JSON.stringify(result, null, 4)}</code></pre>
    </div>
  )
}
