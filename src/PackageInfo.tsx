import packageJson from '../package.json'
function PackageInfo() {
const { name, description, version, author } = packageJson;

  return (
    <div style={{display:'flex',flexDirection:'column'}}>
      {/* <p>Name: {name}</p> */}
      <p>Description: {description}</p>
      <p>Version: {version}</p>
      <p>Author: {author}</p>
    </div>
  );
}

// Export the component
export default PackageInfo;