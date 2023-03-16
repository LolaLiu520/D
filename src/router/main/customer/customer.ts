const customer = () => import('@/views/main/customer/customer.vue')
export default {
  path: '/main/customer',
  name: 'customer',
  component: customer,
  redirect: 'main',
  children: [
    {
      path: '',
      name: 'customerMain',
      component: () => import('@/views/main/customer/main/main.vue')
    },
    {
      path: 'newCustomer',
      name: 'customerEdit',
      component: () => import('@/views/main/customer/edit/edit.vue')
    }
  ]
}
