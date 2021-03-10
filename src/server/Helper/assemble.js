export default async function (compiler, component) {
    let html = '';
    for (const token of component.tokens) {
        html += await compiler.compile(component, token);
    }

    return `
<!DOCTYPE html>
<html lang="en">
<head><title>${component.name} - designbook</title></head>
<body>${html}</body>
</html>
`;
}