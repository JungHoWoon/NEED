import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useUserContext } from '../context/userContext';
import { addOrUpdateCart, getCart, removeCart } from '../api/firebase';

export default function useCart() {
  const {
    user: { uid },
  } = useUserContext();

  const queryClient = useQueryClient();

  const cartQuery = useQuery({
    queryKey: ['carts', uid || ''],
    queryFn: () => getCart(uid),
    enabled: !!uid,
  });

  const addOrUpdateToItem = useMutation({
    mutationFn: (product) => addOrUpdateCart(uid, product),
    onSuccess: () => queryClient.invalidateQueries(['carts', uid]),
  });

  const removeItem = useMutation({
    mutationFn: (id) => removeCart(uid, id),
    onSuccess: () => queryClient.invalidateQueries(['carts', uid]),
  });

  return { cartQuery, addOrUpdateToItem, removeItem };
}
