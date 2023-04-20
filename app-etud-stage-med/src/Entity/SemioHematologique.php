<?php

namespace App\Entity;

use App\Repository\SemioHematologiqueRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: SemioHematologiqueRepository::class)]
class SemioHematologique
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(nullable: true)]
    private ?bool $appris = null;

    #[ORM\Column(nullable: true)]
    private ?bool $vu_faire = null;

    #[ORM\Column(nullable: true)]
    private ?bool $fait = null;

    #[ORM\Column(nullable: true)]
    private ?bool $acquis = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $remarques = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $difficultes = null;

    #[ORM\Column(length: 255)]
    private ?string $id_user = null;

    #[ORM\Column(nullable: true)]
    private ?\DateTimeImmutable $createAt = null;

    #[ORM\Column(nullable: true)]
    private ?\DateTimeImmutable $updatedAt = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function isAppris(): ?bool
    {
        return $this->appris;
    }

    public function setAppris(?bool $appris): self
    {
        $this->appris = $appris;

        return $this;
    }

    public function isVuFaire(): ?bool
    {
        return $this->vu_faire;
    }

    public function setVuFaire(?bool $vu_faire): self
    {
        $this->vu_faire = $vu_faire;

        return $this;
    }

    public function isFait(): ?bool
    {
        return $this->fait;
    }

    public function setFait(?bool $fait): self
    {
        $this->fait = $fait;

        return $this;
    }

    public function isAcquis(): ?bool
    {
        return $this->acquis;
    }

    public function setAcquis(?bool $acquis): self
    {
        $this->acquis = $acquis;

        return $this;
    }

    public function getRemarques(): ?string
    {
        return $this->remarques;
    }

    public function setRemarques(?string $remarques): self
    {
        $this->remarques = $remarques;

        return $this;
    }

    public function getDifficultes(): ?string
    {
        return $this->difficultes;
    }

    public function setDifficultes(?string $difficultes): self
    {
        $this->difficultes = $difficultes;

        return $this;
    }

    public function getIdUser(): ?string
    {
        return $this->id_user;
    }

    public function setIdUser(string $id_user): self
    {
        $this->id_user = $id_user;

        return $this;
    }

    public function getCreateAt(): ?\DateTimeImmutable
    {
        return $this->createAt;
    }

    public function setCreateAt(?\DateTimeImmutable $createAt): self
    {
        $this->createAt = $createAt;

        return $this;
    }

    public function getUpdatedAt(): ?\DateTimeImmutable
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt(\DateTimeImmutable $updatedAt): self
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }
}
