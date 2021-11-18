LVM (Logical Volume Manager)
============================

Install:

    # aptitude install lvm2

Create a physical volumes:

    # pvcreate /dev/sdd /dev/sde

You can view physical volumes using

    # pvscan
or
    # pvdisplay

Create a volume group:

    # vgcreate vg0 /dev/sdd /dev/sde

You can view volume group:
    
    # vgdisplay

Now, you can create a logical volume:
    
    # lvcreate -L 15GB -n lvol0 vg0

You can view logical volume:

    # lvdisplay

Create filesystem ext4

    # mkfs.ext4 -v -L "NewLogicalVolum0" /dev/vg0/lvol0

Resize logical volume
=====================

Now, we resize a logical volume.

Create a physical volume:

    # pvcreate /dev/sdf

Add to vg0 the new physical volume:

    # vgextend vg0 /dev/sdf

Now extend logical volume vl-myvl with 25GB

    # lvextend -L +25GB /dev/vg0/vl-myvl

Finally, we need resize the logical volume(ext2/3/4):

    # resize2fs /dev/vg0/vl-myvl