import MainLayout from 'layouts/MainLayout.vue'
import PageHome from 'pages/PageHome.vue'
import PageCamera from 'pages/PageCamera.vue'
import Error404 from 'pages/Error404.vue'
const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      { path: '', component: PageHome },
      { path: '/camera', component: PageCamera }
    ]
  }
,

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: Error404
  }
]

export default routes
