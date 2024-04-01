import Button from 'react-bootstrap/Button';

export function toButton(tag_names) {
    if (!Array.isArray(tag_names)) return tag_names
    return tag_names.map((tag_name) => <Button className="m-1 p-2" key={`tag_${tag_name}`} href={`/tag/${tag_name}`}>{tag_name}</Button>);
}
