export interface ShoppingCartModalProps {
    active: boolean;
    setActive: (value: boolean) => void;
    order: {
        guitarName: string;
        photo: string;
        comments: string[];
    };
}
