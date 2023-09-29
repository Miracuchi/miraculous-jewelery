import CategoriesBar from './layoutelements/CategoriesBar'
import Footer from '../Compnents/layoutelements/Footer'
import TopBar from './layoutelements/topbar/TopBar'

function Layout1 ({ children }: { children: JSX.Element }): React.JSX.Element {
  return (
        <div>
            <TopBar />
            <CategoriesBar />
            {children}
            <Footer />
        </div>
  )
}

export default Layout1
