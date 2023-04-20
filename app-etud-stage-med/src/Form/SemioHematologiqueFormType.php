<?php

namespace App\Form;

use App\Entity\SemioHematologique;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class SemioHematologiqueFormType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('appris')
            ->add('vu_faire')
            ->add('fait')
            ->add('acquis')
            ->add('remarques')
            ->add('difficultes')
            ->add('id_user')
            ->add('createAt')
            ->add('updatedAt')
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => SemioHematologique::class,
        ]);
    }
}
