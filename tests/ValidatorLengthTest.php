<?php
use PHPUnit\Framework\TestCase;

class ValidatorLengthTest extends TestCase
{
    public function testMin()
    {

		$validator = new \ioValidate\Validator\length( array( 'min' => 5 ) );
		// Empty -- no need to pass values in for this type of validator
		$values = new \ioValidate\Values();

		// Equal
		$this->assertTrue( $validator->Validate( '12345', $values ) );
		// longer
		$this->assertTrue( $validator->Validate( '123456', $values ) );

		// Shorter -- should fail
		$this->assertFalse( $validator->Validate( '1234', $values ) );
    }
	public function testMax()
    {

		$validator = new \ioValidate\Validator\length( array( 'max' => 5 ) );
		// Empty -- no need to pass values in for this type of validator
		$values = new \ioValidate\Values();

		// Equal
		$this->assertTrue( $validator->Validate( '12345', $values ) );
		// Shorter
		$this->assertTrue( $validator->Validate( '1234', $values ) );

		// longer -- should fail
		$this->assertFalse( $validator->Validate( '123456', $values ) );

    }
	public function testMinMax()
    {

		$validator = new \ioValidate\Validator\length( array( 'min' => 3, 'max' => 5 ) );

		// Empty -- no need to pass values in for this type of validator
		$values = new \ioValidate\Values();

		// Equal to max
		$this->assertTrue( $validator->Validate( '12345', $values ) );
		// Shorter than max, longer than min
		$this->assertTrue( $validator->Validate( '1234', $values ) );
		// Shorter than max, equal to min
		$this->assertTrue( $validator->Validate( '123', $values ) );

		// longer than max -- should fail
		$this->assertFalse( $validator->Validate( '123456', $values ) );
		// Shorted than min -- should fail
		$this->assertFalse( $validator->Validate( '12', $values ) );

    }
}
?>
