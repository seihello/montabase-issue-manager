export default function CourseSlugPage({
  params,
}: {
  params: { issueId: string };
}) {
  return <div>{params.issueId}</div>;
}
