// Importing loader package
import Loader from 'react-loader-spinner'

// Importing CSS file
import './index.css'

// Loader component
const LoaderView = () => (
  <div className="loader-container" data-testid="loader">
    <Loader
      type="ThreeDots"
      color="#263868"
      height={50}
      width={50}
    />
  </div>
)

export default LoaderView